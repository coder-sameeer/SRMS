let serial = 1;
function printvalue() {
    let a = document.getElementById("student-name").value.toUpperCase();
    let b = document.getElementById("student-roll").value;
    let math = parseInt(document.getElementById("math").value);
    let physics = parseInt(document.getElementById("physics").value);
    let chemistry = parseInt(document.getElementById("chemistry").value);
    const tr = document.createElement("tr");
    tr.id = "table-row";
    const total = math + physics + chemistry;
    const percentage = ((total / 300) * 100).toFixed(1) + "%";
    const isPass = math >= 33 && physics >= 33 && chemistry >= 33;
    const result = isPass ? "Pass" : "Fail";
    const resultClass = isPass ? "Pass" : "Fail";
    tr.innerHTML = `
    <td>${serial}</td> 
    <td>${a}</td>
    <td>${b}</td>
    <td>${math}</td> 
    <td>${physics}</td> 
    <td>${chemistry}</td>
    <td class="${resultClass}">${result}</td>
    <td>${total}</td>
    <td>${percentage}</td>
    <td><button class="download-btn" onclick="generatePDF('${a}','${b}','${math}','${physics}','${chemistry}','${total}','${percentage}','${result}')">PDF</button></td>
    <td><buttton class="dlt-btn" onclick="dltRow()">Delete</button></td>`;
    serial++;
    document.getElementById("results").appendChild(tr);
    document.getElementById("student-name").value = "";
    document.getElementById("student-roll").value = "";
    if (!a || !b || isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
        alert("Please Fill All Fields Correctly");
        tr.innerHTML = "";
        return;
    }
    clear();
    closeForm();
}
function clear() {
    let a = document.getElementById("student-name").value = "";
    let b = document.getElementById("student-roll").value = "";
    let math = document.getElementById("math").value = "";
    let physics = document.getElementById("physics").value = "";
    let chemistry = document.getElementById("chemistry").value = "";
}
function show() {
    document.getElementById("form").style.display = "block";
    document.getElementById("strip").style.display = "none";
    document.getElementById("table").style.display = "none";
}
function closeForm() {
    document.getElementById("form").style.display = "none";
    document.getElementById("strip").style.display = "";
    document.getElementById("table").style.display = "";
}
function dltRow() {
    const tr = document.getElementById("table-row");
    tr.remove();
};
function search() {
    const input = document.getElementById("search-input").value.toUpperCase();
    const table = document.getElementById("results");
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName("td")[1]; // column 2 = name
        if (nameCell) {
            const nameText = nameCell.textContent || nameCell.innerText;
            if (nameText.toUpperCase().indexOf(input) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}
let menuList = document.getElementById("res")
    menuList.style.maxHeight="0px";
function toggleMenubar(){
    if( menuList.style.maxHeight=="0px"){
            menuList.style.maxHeight="20vh";
    }
    else{
            menuList.style.maxHeight="0px";
    }
}


async function generatePDF(a, b, math, physics, chemistry, total, percentage, result) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text("Student Marksheet", 70, 20);
      doc.setFontSize(15);
      doc.text(`Name: ${a}`, 20, 40);
      doc.text(`Roll No: ${b}`, 20, 50);
      doc.text(`Math: ${math}`, 20, 60);
      doc.text(`Science: ${physics}`, 20, 70);
      doc.text(`English: ${chemistry}`, 20, 80);
      doc.text(`Total Marks: ${total}`, 20, 90);
      doc.text(`Percentage: ${percentage}`, 20, 100);
      doc.text(`Result: ${result}`, 20, 110);
      doc.save(`${a}_marksheet.pdf`);
    }