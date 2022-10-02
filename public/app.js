const toCurrency = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(price);
};

document.querySelectorAll('.price').forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

const CART = document.querySelector('#cart');

if (CART) {
  CART.addEventListener('click', (e) => {
    if (e.target.classList.contains('js-remove')) {
      const id = e.target.dataset.id;

      fetch('cart/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.courses.length) {
            const html = cart.courses
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                </td>
              </tr>
              `;
              })
              .join('');
            CART.querySelector('tbody').innerHTML = html;
            CART.querySelector('.price').textContent = toCurrency(cart.price);
          } else {
            CART.innerHTML = '<p>The cart is empty</p>';
          }
        });
    }
  });
}
