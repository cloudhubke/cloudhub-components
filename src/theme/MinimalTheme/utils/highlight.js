import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// ----------------------------------------------------------------------

hljs.configure({
  languages: ['javascript', 'jsx', 'sh', 'html', 'css', 'bash', 'json']
});

window.hljs = hljs;
