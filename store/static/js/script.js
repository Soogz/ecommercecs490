function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

let btns = document.querySelectorAll('.productContainer button');

btns.forEach(btn => {
    btn.addEventListener('click', addToCart)
});

function addToCart(e) {
    let products_id = e.target.value;
    let url = "/add_to_cart";

    let data = {id: products_id};

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json', 'X-CSRFToken': csrftoken
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('num_of_items').innerText = data
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}