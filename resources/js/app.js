import axios from 'axios';
import Noty from 'noty';
import { initAdmin } from './admin';
import dayjs from 'dayjs';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');


function updateCart(coffee) {
    axios.post('/update-cart', coffee)
        .then(res => {
            cartCounter.innerText = res.data.totalQty;
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'Item added to cart',
                progressBar: false,
            }).show();
        })
        .catch(err => {
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Something went wrong',
                progressBar: false,
            }).show();
        })


}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const coffee = JSON.parse(btn.dataset.coffee);
        updateCart(coffee);
    })
})



// Remove alert message displayed in orders after 2 seconds
const alertMsg = document.querySelector('#success-alert')
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}






// changing order status
let hiddenInput = document.querySelector('#hiddenInput');
let statuses = document.querySelectorAll('.status_line');
let order = hiddenInput ? hiddenInput.value : null;

let time = document.createElement('small');

function updateStatus(order) {
    let stepCompleted = true;
    statuses.forEach((status) => {
        status.classList.remove('step-completed');
        status.classList.remove('current');
    })
    statuses.forEach((status) => {
        let dataProp = status.dataset.status;
        if (stepCompleted) {
            status.classList.add('step-completed');
        }

        if (dataProp == order.status) {
            stepCompleted = false;
            time.innerText = dayjs(order.updateAt).format('MMM D, YYYY h:mm A');
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }

    })
}

updateStatus(JSON.parse(order));


// socket client

let socket = io();

initAdmin(socket);   // calling admin orders code

if (order) {
    socket.emit('join', `order_${JSON.parse(order)._id}`)
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order };
    updatedOrder.updateAt = dayjs().format();
    updatedOrder.status = data.status;
    updateStatus(updatedOrder);

    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order Updated',
        progressBar: false,
    }).show();
})


let adminAreaPath = window.location.pathname;

if (adminAreaPath.includes('admin')) {
    socket.emit('join', 'adminRoom');
}