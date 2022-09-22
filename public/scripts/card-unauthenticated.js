document.querySelector('form').addEventListener('submit', cb)

function cb(event) {
    event.preventDefault()

    var id = +this.querySelector('input[name=\'id\']').value,
        amount = +this.querySelector('input[name=\'amount\']').value

    var templates = JSON.parse(localStorage.getItem('templates')) || Array()

    var template = templates.find(_ => _.id == id)

    if (template) {
        template.amount += amount
    } else {
        templates.unshift({id, amount})
    }

    localStorage.setItem('templates', JSON.stringify(templates))
}
