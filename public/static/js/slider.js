$(function() {
    $('#demo-slider-0').flexslider({
        playAfterPaused: 8000,
        before: function(slider) {
            if (slider._pausedTimer) {
                window.clearTimeout(slider._pausedTimer);
                slider._pausedTimer = null;
            }
        },
        after: function(slider) {
            var pauseTime = slider.vars.playAfterPaused;
            if (pauseTime && !isNaN(pauseTime) && !slider.playing) {
                if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {
                    slider._pausedTimer = window.setTimeout(function() {
                        slider.play();
                    }, pauseTime);
                }
            }
        }
    });
})