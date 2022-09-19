document.querySelector('form').addEventListener('submit', submit)

function submit(event) {
    event.preventDefault()

    var id = +this.querySelector('input[name="id"]').value,
        amount = +this.querySelector('input[name="amount"]').value

    var cart = JSON.parse(localStorage.getItem('cart')) || {items: Array()},
        item = cart.items.find(_ => _.id == id)

    if (item) {
        item.amount += amount
    } else {
        cart.items.unshift({id, amount})
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}
