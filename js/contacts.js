(function() {
    function makeSocialLinksClickable() {
        const socialBlocks = document.querySelectorAll('.socialMedia');
        
        socialBlocks.forEach(block => {
            const url = block.dataset.url;
            if (!url) return;
            
            block.style.cursor = 'pointer';
            
            block.addEventListener('click', (e) => {
                e.stopPropagation();
                window.open(url, '_blank', 'noopener,noreferrer');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', makeSocialLinksClickable);
    } else {
        makeSocialLinksClickable();
    }
})();