export function playAudio(path: string | null): void {
    if (!path) {
        alert('Audio path tidak tersedia.');

        return;
    }

    new Audio(`/storage/${path}`)
        .play()
        .catch((err) => {
            console.error('Audio error:', err);
        });
}

export function getYouTubeEmbedUrl(url: string): string | null {
    if (!url) {
        return null;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }

    return null;
}