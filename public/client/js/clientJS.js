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
    }
  });
}
