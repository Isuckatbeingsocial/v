function NewRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@${}_-<>';
    let id = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }

    return id;
}

class File {
    constructor(name, content = '') {
        this.name = name;
        this.content = content;
        this.size = content.length;
        this.createdAt = new Date();
        this.modifiedAt = this.createdAt;
        this.fileId = NewRandomId();
    }

    updateContent(content) {
        this.content = content;
        this.size = content.length;
        this.modifiedAt = new Date();
    }
}

class Directory {
    constructor(name) {
        this.name = name;
        this.files = {};
        this.subdirectories = {};
    }

    createFile(name, content) {
        if (!this.files[name]) {
            this.files[name] = new File(name, content);
            return true;
        }
        return false;
    }

    createDirectory(name) {
        if (!this.subdirectories[name]) {
            this.subdirectories[name] = new Directory(name);
            return true;
        }
        return false;
    }

    deleteFile(name) {
        if (this.files[name]) {
            delete this.files[name];
            return true;
        }
        return false;
    }

    deleteDirectory(name) {
        if (this.subdirectories[name]) {
            delete this.subdirectories[name];
            return true;
        }
        return false;
    }

    listFilesAndDirectories() {
        return {
            files: Object.keys(this.files),
            directories: Object.keys(this.subdirectories),
        };
    }
}

window['FILES_API'] = {
    File,
    Directory,
    getFileContent: function(directoryId, fileId) {
        if (directoryId in this && fileId in this[directoryId].files) {
            return this[directoryId].files[fileId].content;
        }
        return null;
    }
};
