
import { useEffect } from 'react';

export const useContentProtection = () => {
  useEffect(() => {
    // Show warning message
    const showWarning = (message: string) => {
      const warning = document.createElement('div');
      warning.className = 'copy-warning';
      warning.textContent = message;
      document.body.appendChild(warning);
      
      setTimeout(() => {
        if (document.body.contains(warning)) {
          document.body.removeChild(warning);
        }
      }, 3000);
    };

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showWarning('Right-click is disabled to protect content');
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        showWarning('Developer tools are disabled');
        return false;
      }
      
      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showWarning('Developer tools are disabled');
        return false;
      }
      
      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        showWarning('Console is disabled');
        return false;
      }
      
      // Disable Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        showWarning('Element inspector is disabled');
        return false;
      }
      
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showWarning('View source is disabled');
        return false;
      }
      
      // Disable Ctrl+A (Select All)
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        showWarning('Text selection is disabled');
        return false;
      }
      
      // Disable Ctrl+C (Copy)
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        showWarning('Copying is disabled');
        return false;
      }
      
      // Disable Ctrl+V (Paste) - not really needed but for completeness
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+X (Cut)
      if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        showWarning('Cutting is disabled');
        return false;
      }
      
      // Disable Ctrl+S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showWarning('Saving is disabled');
        return false;
      }
      
      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        showWarning('Printing is disabled');
        return false;
      }
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      showWarning('Dragging is disabled');
      return false;
    };

    // Detect developer tools (basic detection)
    const detectDevTools = () => {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();
      
      if (endTime - startTime > 100) {
        showWarning('Developer tools detected! Content is protected.');
      }
    };

    // Disable text selection programmatically
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable print media queries
    const disablePrint = () => {
      const style = document.createElement('style');
      style.textContent = `@media print { * { display: none !important; } }`;
      document.head.appendChild(style);
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);
    
    // Check for dev tools periodically
    const devToolsInterval = setInterval(detectDevTools, 1000);
    
    // Disable printing
    disablePrint();

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      clearInterval(devToolsInterval);
    };
  }, []);
};
