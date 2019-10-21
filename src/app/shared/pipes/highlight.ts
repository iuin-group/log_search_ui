import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightPipe implements PipeTransform {

    transform(text: string, keys: string): string {
        if (keys && text) {
            const result = this.markKey(text, keys);
            return result;
        } else {
            return text;
        }
    }

    private markKey(text, key) {
        let pattern = key.replace(/[\,\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        if (key.search('<|>') > -1) {
            pattern = this.searchTextEscape(pattern);
        }
        const regex = new RegExp(pattern, 'gi');
        text = this.htmlTextEscape(text);
        text =  text.replace(regex, (match) => `<mark>${match}</mark>`);
        return this.htmlTextUnescape(text);
    }

    private searchTextEscape(str) {
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        return str;
    }

    private htmlTextEscape(str) {
        str = str.replace(/<pre>/g, '【');
        str = str.replace(/<\/pre>/g, '】');
        return str;
    }

    private htmlTextUnescape(str) {
        str = str.replace(/【/g, '<pre>');
        str = str.replace(/】/g, '</pre>');
        return str;
    }
}
