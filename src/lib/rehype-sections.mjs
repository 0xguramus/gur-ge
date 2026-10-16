// Wraps each h2 and its following content in <section class="md-sec" id="sec-…">,
// and turns "<p><strong>Label</strong></p><ul>…</ul>" pairs into <div class="md-card">.
// Harmless for normal posts (sections are unstyled by default).
const isEl = (n, tag) => n && n.type === 'element' && (!tag || n.tagName === tag);
const textOf = n => n.type === 'text' ? n.value : (n.children || []).map(textOf).join('');
function cards(children) {
  const out = [];
  for (let i = 0; i < children.length; i++) {
    const n = children[i];
    const kids = isEl(n, 'p') ? n.children.filter(c => !(c.type === 'text' && !c.value.trim())) : [];
    if (kids.length === 1 && isEl(kids[0], 'strong')) {
      let j = i + 1; while (children[j] && children[j].type === 'text' && !children[j].value.trim()) j++;
      if (isEl(children[j], 'ul') || isEl(children[j], 'ol')) {
        out.push({ type: 'element', tagName: 'div', properties: { className: ['md-card'], dataLabel: textOf(kids[0]) },
          children: [{ type: 'element', tagName: 'h3', properties: { className: ['md-card-title'] }, children: kids[0].children }, children[j]] });
        i = j; continue;
      }
    }
    out.push(n);
  }
  return out;
}
export default function rehypeSections() {
  return tree => {
    const out = []; let cur = null;
    for (const n of tree.children) {
      if (isEl(n, 'h2')) {
        cur = { type: 'element', tagName: 'section', properties: { className: ['md-sec'], dataFor: n.properties?.id }, children: [n] };
        out.push(cur);
      } else if (cur) cur.children.push(n);
      else out.push(n);
    }
    for (const s of out) if (isEl(s, 'section')) s.children = cards(s.children);
    tree.children = out;
  };
}
