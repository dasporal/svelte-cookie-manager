// prefix-classes.mjs
import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

const rootDir = './src';

/**
 * Process a literal string by prefixing every non‐whitespace token with "scm-"
 * if it does not already start with that prefix.
 */
function processLiteral(literal) {
  return literal.replace(/(\S+)/g, (token) =>
    token.startsWith('') ? token : `scm-${token}`
  );
}

/**
 * Process any string literals inside a computed expression.
 * It searches for string literals (both single- and double-quoted) and applies
 * processLiteral to their contents.
 */
function processComputedExpression(expr) {
  return expr.replace(/(['"])([^'"]+)\1/g, (match, quote, content) => {
    const processed = processLiteral(content);
    return `${quote}${processed}${quote}`;
  });
}

/**
 * Process a template literal’s content that may include interpolated expressions.
 * It splits the content on `${…}` tokens, processes literal parts with processLiteral,
 * and for each `${…}` block, processes its inner JavaScript via processComputedExpression.
 */
function processTemplateLiteral(content) {
  return content
    .split(/(\$\{[^}]+\})/)
    .map((part) => {
      if (/^\$\{[^}]+\}$/.test(part)) {
        // Remove the wrapping ${ and }...
        const inner = part.slice(2, -1);
        // Process any string literals inside the computed expression.
        return '${' + processComputedExpression(inner) + '}';
      } else {
        return processLiteral(part);
      }
    })
    .join('');
}

/**
 * Replacement function for computed/template literal class attributes.
 * It expects to match attributes written as:
 *   class={\` ... \`}
 */
function computedTemplateReplacer(match, content) {
  const processed = processTemplateLiteral(content);
  return `class={\`${processed}\`}`;
}

/**
 * Replacement function for plain literal class attributes.
 * It handles attributes like:
 *   class="...content..."
 * or
 *   class='...content...'
 */
function literalReplacer(match, quote, content) {
  const processed = processLiteral(content);
  return `class=${quote}${processed}${quote}`;
}

async function prefixClasses() {
  try {
    // Find all .svelte files under the root directory.
    const files = await glob('**/*.svelte', { cwd: rootDir });

    for (const file of files) {
      const filePath = path.join(rootDir, file);
      let data = await fs.readFile(filePath, 'utf8');

      // First, handle computed/template literal class attributes.
      data = data.replace(/class=\{\`([\s\S]*?)\`\}/g, computedTemplateReplacer);

      // Then, handle plain literal class attributes.
      data = data.replace(/class=(["'])([\s\S]*?)\1/g, literalReplacer);

      await fs.writeFile(filePath, data, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  } catch (err) {
    console.error(err);
  }
}

prefixClasses();
