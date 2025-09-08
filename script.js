cartArray = [];

const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    
    
}


const removeActive = () => {
    const categoryButtons = document.querySelectorAll('.category-btn')
    categoryButtons.forEach(btn => {
        btn.classList.remove("active")
    });

}

const loadCategoryData = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const categoryDiv = document.getElementById(`category-div-${id}`)
        categoryDiv.classList.add("active")

        displayCategoryData(data.plants)
    })
}

const loadPlantDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((data) => displayPlanDetails(data.plants[id-1]))
}


const displayPlanDetails = (plants) => {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = ""
    const modalDiv = document.createElement('div')

    modalDiv.innerHTML = `
             <div>
                    <h3 class="text-lg font-bold">${plants.name}</h3>
                <img class="h-50 w-full object-cover" src=${plants.image} alt="">
                <h1 class="my-1"><span class="font-bold ">Category:</span> ${plants.category}</h1>
                <h1 class="mb-1"><span class="font-bold ">Price:</span> ${plants.price}</h1>
                <h1><span class="font-bold">Description:</span> ${plants.description}</h1>
                
                <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
                </div>
             </div>
    `
    modalContainer.appendChild(modalDiv)
    document.getElementById('my_modal_1').showModal()
    console.log(plants)
}

const displayCategoryData = (plants) =>{
       const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""


    plants.forEach(plant => {
    
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = `
        <div class="card bg-base-100 w-80 shadow-sm  h-full">
                    <figure>
                        <img
                        class="h-50 w-full object-cover"
                        src=${plant.image}
                        alt="Shoes" />
                    </figure>
                    <div class="p-5">
                        <h2 onclick="loadPlantDetails(${plant.id})" class="cursor-pointer text-lg font-semibold mb-2 mt-1">${plant.name}</h2>
                        <p class="h-36">${plant.description}</p>
                        <div class="flex justify-between mt-3 mb-4">
                            <p class="bg-green-100 inline-block px-2 rounded-xl">${plant.category}</p>
                            <p class="font-semibold text-green-700">৳${plant.price}</p>
                        </div>
                        <div class="card-actions items-end ">
                        <button onClick = "addToCart('${plant.name}',${plant.price})" class="btn btn-success w-full rounded-3xl">Add to Cart</button>
                        </div>
                    </div>
                    </div>

    `
    cardContainer.appendChild(cardDiv)
    
});

}




const displayCategories = (categories)=>{
const categoriesContainer = document.getElementById('categories-container')

categories.forEach(category => {
    const categoryDiv = document.createElement('div')
    categoryDiv.innerHTML = `
        <div id="category-div-${category.id}" onclick="loadCategoryData(${category.id})" class="category-btn text-black cursor-pointer hover:bg-green-200 px-2 py-1 rounded mb-2">
         ${category.category_name}
        </div>
    `
    categoriesContainer.appendChild(categoryDiv)
});

}
   
const addToCart = (name,price) =>{
     const cartContainer = document.getElementById('cart-container')
        cartContainer.innerHTML=""
 const addTo = document.getElementById("add-cart-btn")
    // console.log(e,f)
   const btn = {
        name : name,
        price : price
    }
    cartArray.push(btn)
    
    
      const totalPrice = document.getElementById('total-price')
      const currentTotal = parseInt(totalPrice.innerText)

    cartArray.forEach((element,i) => { 
        const cartDiv = document.createElement('div')
        cartDiv.innerHTML= `
        <div  class="mb-2 flex justify-between items-center p-2 rounded bg-[#F0FDF4]">
                        <div>
                            <h1 class="font-medium">${element.name}</h1>
                            <p class="text-gray-500 inline">${element.price} </p> <span class="inline" >x 1</span>
                        </div>
                        <i onClick="removeItem(this,${i})" id="remove-cart-item" class="fa-solid fa-xmark"></i>
        </div>
        ` 
        cartContainer.appendChild(cartDiv)

        
        totalPrice.innerText = currentTotal + element.price
        
        
    });

}
const removeItem = (e,index) =>{
    
    
     const totalPrice = document.getElementById('total-price')
      const currentTotal = parseInt(totalPrice.innerText)
      const deduct = parseInt(e.parentNode.childNodes[1].childNodes[3].innerText )
    e.parentNode.remove(e);
    cartArray.splice(index);
    totalPrice.innerText = currentTotal -deduct 
    console.log(index)
}





loadCategories()

