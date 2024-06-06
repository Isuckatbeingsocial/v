class WINDOWAPI {
    constructor(params) {
        this.windows = [];
        this.defaultWidth = 400;
        this.defaultHeight = 300;
        this.resizeHandleSize = 10; // Size of the resize handle in pixels
    }

    createWindow(title, width = this.defaultWidth, height = this.defaultHeight) {
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.style.width = `${width}px`;
        windowElement.style.height = `${height}px`;
        windowElement.style.position = 'absolute';
        windowElement.style.border = '1px solid #333'; // Dark border color
        windowElement.style.backgroundColor = '#222'; // Dark background color
        windowElement.style.color = '#fff'; // Light text color
        windowElement.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)'; // Light shadow color
        windowElement.style.resize = 'both'; // Enable resizing
        windowElement.style.overflow = 'auto'; // Allow overflow content to be scrolled

        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        titleBar.style.backgroundColor = '#111'; // Dark title bar color
        titleBar.textContent = title;
        windowElement.appendChild(titleBar);

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '0';
        closeButton.style.right = '0';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(windowElement);
            this.windows = this.windows.filter((win) => win !== windowElement);
        });

        const minButton = document.createElement('button');
        minButton.className = 'min-button';
        minButton.textContent = '--';
        minButton.style.position = 'absolute';
        minButton.style.top = '0';
        minButton.style.right = '40px';
        let isMinimized = false;
        minButton.addEventListener('click', () => {
            if (!isMinimized) {
                windowElement.style.height = `20px`;
                windowElement.querySelector('.content').style.display = 'none'; // Hide content
                windowElement.querySelector('.resize-handle').style.display = 'none'; // Hide resize handle
                isMinimized = true;
            } else {
                windowElement.style.height = `${height}px`;
                windowElement.querySelector('.content').style.display = 'block'; // Show content
                windowElement.querySelector('.resize-handle').style.display = 'block'; // Show resize handle
                isMinimized = false;
            }
        });

        titleBar.appendChild(closeButton);
        titleBar.appendChild(minButton);
        const content = document.createElement('div');
        content.className = 'content';
        windowElement.appendChild(content);

        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        resizeHandle.style.width = `${this.resizeHandleSize}px`;
        resizeHandle.style.height = `${this.resizeHandleSize}px`;
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.right = '0';
        resizeHandle.style.bottom = '0';
        resizeHandle.style.cursor = 'se-resize'; // Resize cursor for bottom right corner
        windowElement.appendChild(resizeHandle);

        let isDragging = false;
        let isResizing = false;
        let offset = { x: 0, y: 0 };
        let resizeDirection = '';

        titleBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            offset.x = e.clientX - windowElement.getBoundingClientRect().left;
            offset.y = e.clientY - windowElement.getBoundingClientRect().top;
        });

        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            const rect = windowElement.getBoundingClientRect();
            offset.x = e.clientX - rect.right;
            offset.y = e.clientY - rect.bottom;
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                windowElement.style.left = `${e.clientX - offset.x}px`;
                windowElement.style.top = `${e.clientY - offset.y}px`;
            } else if (isResizing) {
                const rect = windowElement.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                windowElement.style.width = `${mouseX + offset.x}px`;
                windowElement.style.height = `${mouseY + offset.y}px`;
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            isResizing = false;
            resizeDirection = '';
        });

        document.body.appendChild(windowElement);
        this.windows.push(windowElement);

        return windowElement;
    }
}

OS['WINDOWAPI'] = new WINDOWAPI();
