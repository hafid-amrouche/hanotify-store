export function darkenHexColor(hex, percent) {
    // Ensure hex starts with '#'
    if(hex){
      if (hex[0] === '#') {
        hex = hex.slice(1);
      }
    
      // Convert hex to RGB
      let r = parseInt(hex.slice(0, 2), 16);
      let g = parseInt(hex.slice(2, 4), 16);
      let b = parseInt(hex.slice(4, 6), 16);
    
      // Calculate darkening factor
      const factor = (100 - percent) / 100;
    
      // Darken each color component
      r = Math.round(r * factor);
      g = Math.round(g * factor);
      b = Math.round(b * factor);
    
      // Ensure values are within the valid range
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));
    
      // Convert RGB back to hex
      const newHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
      return newHex;
    }
}

const getScrollableAncestor = (element) => {
  let currentNode = element.parentElement;

  while (currentNode && currentNode !== document.body) {
    const style = window.getComputedStyle(currentNode);
    const overflow = style.overflow;

    // Check if the element is scrollable
    if ( overflow  === 'auto' ) {
      if (currentNode.scrollHeight > currentNode.clientHeight) {
        return currentNode;
      }
    }

    // Move to the parent node
    currentNode = currentNode.parentElement;
  }

  // Default to the body or documentElement if no scrollable ancestor is found
  return document.scrollingElement || document.documentElement;
};

export function adjustScrollPosition(element) {
  // Get the element's bounding box relative to the viewport
  const rect = element.getBoundingClientRect();
  const scrollingContainer = getScrollableAncestor(element)
  // Calculate the amount of space needed to ensure the dropdown is fully visible
  const spaceBelow = scrollingContainer.clientHeight - rect.bottom;

  if (spaceBelow < 0) { // If there's not enough space below
    // Scroll the window to make the drop-down fully visible
    scrollingContainer.scrollBy({
      top: -spaceBelow,
      behavior: 'smooth'
    });
  }
}

export const translaste=(text)=>text


export function adjustScrollToTop(element, delta= 0) {
  // Get the element's bounding box relative to the viewport
  const rect = element.getBoundingClientRect();
  const scrollingContainer = document.documentElement
  // Calculate the amount of space needed to ensure the dropdown is fully visible

  scrollingContainer.scrollBy({
    top: rect.top + delta,
    behavior: 'smooth'
  });

}

export function capitalizeFirstLetter(word) {
  if (typeof word !== 'string' || word.length === 0) {
      return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function isNum(char) {
  return char >= '0' && char <= '9';
}