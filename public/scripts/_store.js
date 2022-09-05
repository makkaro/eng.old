var collapse_toggles = document.querySelectorAll('.collapse-toggle')
Array.from(collapse_toggles).forEach(toggle => {
    toggle.addEventListener('click', function (event) {
        event.preventDefault()
        var target = this.getAttribute('data-target')
        var collapse = document.getElementById(target)
        collapse.classList.toggle('hidden')
        Array.from(this.querySelectorAll('svg')).forEach(svg => {
            svg.classList.toggle('hidden')
        })
    })
})

var drop_toggles = document.querySelectorAll('.drop-toggle')
Array.from(drop_toggles).forEach(toggle => {
    toggle.addEventListener('click', function () {
        var target = this.getAttribute('data-target')
        var drop = document.getElementById(target)
        drop.classList.toggle('opacity-0')
        drop.classList.toggle('scale-95')
    })
})

var filters = document.getElementById('filters'),
    bg = document.getElementById('filters-bg'),
    hide = document.getElementById('filters-hide'),
    show = document.getElementById('filters-show')
Array(bg, hide, show).forEach(toggle => {
    toggle.addEventListener('click', function () {
        filters.classList.toggle('hidden')
    })
})
