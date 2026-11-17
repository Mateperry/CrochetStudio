import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, buildPageTitle } from '../../lib/seo';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!content) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Page title and meta tags. Format: "<Página> · Crochet Studio".
 *
 * index.html already ships generic <title>, description and Open Graph tags (crawlers that do not
 * run JavaScript read those). React 19 would append a second <title>/<meta> instead of replacing
 * them, and browsers keep the first one, so this component updates the existing tags instead.
 */
export default function PageMeta({ title, description = DEFAULT_DESCRIPTION, image, type = 'website' }) {
  useEffect(() => {
    const fullTitle = buildPageTitle(title);
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
  }, [title, description, image, type]);

  return null;
}
