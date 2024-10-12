// Display image follow Swiper
const tourImage = document.querySelector(".tour-imgs");

if(tourImage) {
  const swiper = new Swiper(".tour-imgs", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper2 = new Swiper(".tour-imgs2", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
}
// End Display image follow Swiper

const cart = localStorage.getItem("cart");

if(!cart){
  localStorage.setItem("cart", JSON.stringify([]));
};

// showAlert

const showAlert = () => {
  const alert = document.querySelector(".my-alert");
  if(alert){
    alert.setAttribute("show", "play");
    setTimeout(()=>{
      alert.setAttribute("show", "hidden");
    }, 1500);
  }
}

//End showAlert

// showQuantityInCart
const showCart = () => {
  const cart = document.querySelector("[my-cart]");
  if(cart){
    const myCart = JSON.parse(localStorage.getItem("cart"));
    const lengtCart = cart.querySelector("span");
    lengtCart.innerHTML = myCart.length;
  }
}
// EndshowQuantityInCart

showCart();

const formCart = document.querySelector("[form-add-to-cart]");
if(formCart){
  // console.log(formCart);
  formCart.addEventListener("submit", (event)=> {
    event.preventDefault();
    let tourId = formCart.getAttribute("tour-id");
    let quantity = formCart.querySelector("input").value;
    tourId = parseInt(tourId);
    quantity = parseInt(quantity);
    // console.log(tourId, quantity);
    if(tourId && quantity){
      let cart = localStorage.getItem("cart");
      cart = JSON.parse(cart);
      let exist = cart.find(item => item.tourId == tourId);
      // console.log(exist);
      if(exist){ // If exist tourId in cart, update quantity of tourID in cart
        exist.quantity = parseInt(exist.quantity);
        exist.quantity += quantity;
      }
      else{ // Create data and push to cart
        const newTour = {
          tourId: tourId,
          quantity: quantity
        }
        cart.push(newTour);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      showAlert();
      showCart();
    }
  });
}

const tableCart = document.querySelector("[table-cart]");
if(tableCart){
  fetch("cart/listTourJson",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
  .then(res => res.json())
  .then(data => {
    if(data.code == 200){
      const htmlArray = data.listTours.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>
          <img src="${item.image}" alt="${item.title}" width="80px" />
        </td>
        <td>
          <a href="/tours/detail/${item.slug}">${item.title}</a>
        </td>
        <td>
          ${item.price.toLocaleString()}đ
        </td>
        <td>
          <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px;" />
        </td>
        <td>
          ${item.total.toLocaleString()}đ
        </td>
        <td>
          <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
        </td>
      </tr>
    `)
    const tbody = tableCart.querySelector("tbody");
    tbody.innerHTML = htmlArray.join("");

  }
  })
}
