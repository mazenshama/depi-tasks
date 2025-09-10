let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

function addOrUpdateProduct() {
const name = document.getElementById("pName").value;
const price = document.getElementById("pPrice").value;
const category = document.getElementById("pCategory").value;
const desc = document.getElementById("pDesc").value;

if (name && price && category && desc) {
if (editIndex === null) {
products.push({ name, price, category, desc });
} else {
products[editIndex] = { name, price, category, desc };
editIndex = null;
}
saveToLocalStorage();
clearForm();
displayProducts();
} else {
alert("Please fill all fields");
}
}


function displayProducts() {
let table = "";
products.forEach((p, i) => {
table += `
<tr>
<td>${i + 1}</td>
<td>${p.name}</td>
<td>${p.price}</td>
<td>${p.category}</td>
<td>${p.desc}</td>
<td>
<span class="update" onclick="editProduct(${i})">Update</span> |
<span class="delete" onclick="deleteProduct(${i})">Delete</span>
</td>
</tr>`;
});
document.getElementById("productTable").innerHTML = table;
}
function deleteProduct(i) {
products.splice(i, 1);
saveToLocalStorage();
displayProducts();
}
function editProduct(i) {
document.getElementById("pName").value = products[i].name;
document.getElementById("pPrice").value = products[i].price;
document.getElementById("pCategory").value = products[i].category;
document.getElementById("pDesc").value = products[i].desc;
editIndex = i;
}
function clearForm() {
document.getElementById("pName").value = "";
document.getElementById("pPrice").value = "";
document.getElementById("pCategory").value = "";
document.getElementById("pDesc").value = "";
}
function saveToLocalStorage() {
localStorage.setItem("products", JSON.stringify(products));
}
function searchProduct() {
const query = document.getElementById("search").value.toLowerCase();
let table = "";
products.forEach((p, i) => {
if (p.name.toLowerCase().includes(query)) {
table += `
<tr>
<td>${i + 1}</td>
<td>${p.name}</td>
<td>${p.price}</td>
<td>${p.category}</td>
<td>${p.desc}</td>
<td>
<span class="update" onclick="editProduct(${i})">Update</span> |
<span class="delete" onclick="deleteProduct(${i})">Delete</span>
</td>
</tr>`;
}
});
document.getElementById("productTable").innerHTML = table;
}
function clearAllProducts() {
if (confirm("Are you sure you want to delete all products?")) {
products = [];
localStorage.removeItem("products");
displayProducts();
}
}

displayProducts();
