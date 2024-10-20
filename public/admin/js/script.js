
// const formCreatTour = document.querySelector("[create-new-tour]");
// if(formCreatTour){
//   formCreatTour.addEventListener("submit", (event)=>{
//     event.preventDefault();
//     const dataNewTour = {};
//     dataNewTour.title = formCreatTour.title.value;
//     dataNewTour.price = formCreatTour.price.value;
//     dataNewTour.discount = formCreatTour.discount.value;
//     dataNewTour.quantity = formCreatTour.stock.value;
//     dataNewTour.images = formCreatTour.images.value;
//     dataNewTour.timeStart = formCreatTour.timeStart.value;
//     dataNewTour.position = formCreatTour.position.value;
//     dataNewTour.status = formCreatTour.querySelector("input[input-status]:checked").value;
//     let arrayCategory = [];
//     const listCategory = formCreatTour.querySelectorAll("input[id-category]:checked");
//     if(listCategory.length > 0){
//       listCategory.forEach(item => {
//         arrayCategory.push(item.value);
//       });
//     }
//     dataNewTour.listCategoryId = arrayCategory;
//     console.log(dataNewTour);
//     // const dataIdCategory = {
//     //   listId: arrayCategory
//     // }
//     // fetch("/admin/tours/create", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json"
//     //   },
//     //   body: JSON.stringify(dataNewTour)
//     // })
//     // .then(res => res.json())
//     // .then(data => {
//     //   if(data.code == 200)
//     //     console.log("ok");
//     // })
//   });
//   // console.log("oke");

// }