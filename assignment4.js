/*=============================  Variable  ==============================*/
// input field array in expense form
var expformAry = [
    { 
        name: "日期",
        field: "date",
        value: "inputDate",
        required: 1,
        type: "date",
        check: false,
        heading: 1
    },
    {
        name: "類型",
        field: "type",
        value: "inputType",
        required: 1,
        type: "text",
        check: false,
        heading: 1
    },
    {
        name: "類別",
        field: "category",
        value: "inputCategory",
        required: 1,
        type: "text",
        check: false,
        heading: 1
    },
    {
        name: "品項",
        field: "item",
        value: "inputItem",
        required: 1,
        type: "text",
        check: false,
        heading: 1
    },
    {
        name:"金額",
        field: "money",
        value: "inputMoney",
        required: 1,
        type: "money",
        check: false,
        heading: 1
    },
    {
        name: "地點",
        field: "location",
        value: "inputLocation",
        required: 0,
        type: "text",
        check: false,
        heading: 0
    },
    {
        name: "備註",
        field: "memo",
        value: "inputMemo",
        required: 0,
        type: "text",
        check: false,
        heading: 0
    },
    {
        name: "照片",
        field: "picture",
        value: "inputPicture",
        required: 0,
        type: "pic",
        check: false,
        heading: 0
    }
];

// category object in expense form
var categoryObj = {
    1: "食物",
    2: "生活",
    3: "交通",
    4: "住宿",
    5: "教育",
    6: "遊樂"
};

// expense record array
var expRecordAry = new Array();
// 範例
var testObj = {
    heading: "heading1",
    collapse: "collapse1",
    date: "2019-12-06",
    type: "1",
    category: "2",
    item: "展示用",
    money: 0,
    location: "404 class",
    memo: "示範備註，可以繼續新增"
}
expRecordAry.push(testObj);

/*===========================  Sub Function  ============================*/
// check if category object is not null
function chkObject(inputObj){
    var o = inputObj;
    // 判斷Category是否存在
    if(o){
        // 判斷Category是否為空
        if(Object.keys(o).length !== 0){
            return true;
        }
        else{
            console.log("error msg: 尚未新增類別");
            return false;
        }
    }
    else{
        console.log("error msg: 類別不存在");
        return false;
    }
}

// check if value is null
function valueIsNull(chkInput){
    var v = chkInput;
    if(typeof(v) !== "undefined"){
        var str = v;
        var value = str.trim();
        if(value.length == 0 || value == ''){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        console.log("error msg: 變數類型無法判斷空值");
        return false;
    }
}

// check if input is a positive integer
function isPosInteger(chkNum){
    var n = chkNum;
    // 不可為空值
    if (valueIsNull(n) !== true){
        // 檢查輸入是否為數字
        if(!(isNaN(n)) && !(Number.isNaN(n))){
            var value = n;
            // 是否為正整數
            var chkInt = /^[0-9]*[1-9][0-9]*$/
            if(chkInt.test(value)){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            alert("請輸入有效數值");
            return false;
        }
    }
}

// check if required input is not empty
function chkInputRequired(userInput, displayValue){
    var n = userInput;
    var d = displayValue;
    if (valueIsNull(n) !== true){
        return true;
    }
    else{
        alert(d+"不可空白");
        return false;
    }
}

// count same object attribute values in the array
function countAryValue(chkAry,chkField,chkFieldValue){
    var a = chkAry;
    var f = chkField;
    var v = chkFieldValue;
    var count = 0;
    for(let i=0; i<=a.length-1; i++){
        var temp = a[i];
        // console.log("第"+i+"個"+temp+": "+temp[f]);  //檢查用
        if (temp[f] === v){
            count++;
        }
    }
    return count;
}

// generate today's date (format: yyyy-MM-dd)
function todayDate(){
    var today = new Date();
    var yyyy = today.getFullYear();
    var MM = (today.getMonth()+1) >= 10 ? (today.getMonth()+1) : ("0"+(today.getMonth()+1));
    var dd = (today.getDate()) >= 10 ? (today.getDate()) : ("0"+today.getDate());
    // var todayDate = (today.toLocaleDateString()).replace(/\//g,"-");
    var todayDate = yyyy + "-" + MM + "-" + dd;
    return todayDate;
}

// clear form
function clearForm(){
    // clear form
    var inputTag = document.getElementsByTagName("input");
    var textareaTag = document.getElementsByTagName("textarea");
    for (let i in inputTag){
        inputTag[i].value = "";
    }
    for (let i in textareaTag){
        textareaTag[i].value = "";
    } 
}

// clear the form and set the default form value
function setDefaultFormValue(){
    // clear form
    clearForm();
    // set today date
    document.getElementById("inputDate").value = todayDate();
    // set default type options
    var categories = document.getElementById("inputCategory").value;
    if( valueIsNull(categories) === true){
        // 帶入類別的選項
        if(addCategoryOption(categoryObj) !== 0){
            document.getElementById("inputCategory").appendChild(addCategoryOption(categoryObj));
        }
        else{
            console.log("error msg: 類別設定錯誤");
        }
    }
    // set input Picture
    document.getElementById("inputPicture").setAttribute("value","0");
    document.getElementById("inputPicText").innerText = "upload your image";
}

// set the default check value in "expformAry"
function setDefaultCheckValue(){
    var inputNum = expformAry.length;
    for (let i=0; i<=inputNum-1; i++){
        var getInputAry = expformAry[i];
        getInputAry["check"] = false;
    }
}

// add category options
function addCategoryOption(o){
    // 檢查物件
    if (chkObject(o) === true){
        var obj = o;
        var fragment = document.createDocumentFragment();
        for (let i in obj){
            var objKey = i;
            var objValue = obj[i];
            var opt = document.createElement("option");
            opt.value = objKey;
            opt.appendChild(document.createTextNode(objValue));
            fragment.appendChild(opt);
        }
        return fragment;
    }
    else{
        return false;
    }
}

// get current directory path
function getCurrentDir(){
    let currHref = location.href;
    let currArr = currHref.split("/");
    delete currArr[currArr.length - 1];
    return currArr.join("/");
}


/* file handling */
// handle XHR response messages
function responseHandler(xmlhttprequest){
    // 已請求的xmlhttprequest
    const xhr = xmlhttprequest;
    // 取得回應表頭
    let type = xhr.getResponseHeader("Content-Type");
    
    // 回傳訊息
    let response;

    // 判斷媒體類型
    if(type.match(/^application\/json/)){
        response = JSON.parse(xhr.responseText);
    }
    else if(type.match(/^application\/xml/)){
        response = xhr.responseXML;
    }
    else{
        response = xhr.responseText;
    }
    return response;
}

// file upload
"use strict";
function uploadFile(uploadPHPName, fileTagIdName, formTagIdName, checkAttribute, checkUploadValue){
    // phpfile
    const upPHPFile = ((uploadPHPName.toLowerCase()).indexOf(".php") != -1 ) ? (uploadPHPName) : (uploadPHPName+".php");
    var fileTagId = fileTagIdName;
    var formTagId = formTagIdName;
    var chkAttr  = checkAttribute;       //判別檔案是否上傳的屬性
    var chkUpValue = checkUploadValue;   //判別是否檔案已上傳值
    // get XHR
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            console.log("XMLHttpRequestStatus ok");
        }
        else{
            console.log("XMLHttpRequestStatus not yet ok");
            console.log("readyState: ", xhttp.readyState);
            console.log("status: ", xhttp.status);
            // console.log("readyState: ", xhttp.statusText);
            // console.log("status: ", xhttp.responseText);
        }
    };
    // php
    var currPath =  getCurrentDir();
    console.log("current path:", currPath);
    var upFileName = upPHPFile;
    var upFilePath = currPath+upFileName;
    // get image file
    var uploadFile = document.getElementById(fileTagId);
    var upFile = uploadFile.files[0];
    console.log(upFile);
    // XMLHttpRequest
    xhttp.open('POST', upFilePath, true);
    // xhttp.setRequestHeader('Content-Type', 'multipart/form-data');
    if(upFile){
        // 判別是否使用者是否有上傳檔案
        var result = document.getElementById(fileTagId).setAttribute(chkAttr, chkUpValue);
        // 使用POST方法，設置以FormData的方式提交資料
        // var formdata = new FormData();
        // formdata.append("file", upFile);
        var formdata = new FormData(document.getElementById(formTagId));
        xhttp.send(formdata);
        console.log("system msg: picture have been send out");
    }
    return false;
}

// file download
function downloadFile(downloadPHPName){
    // phpfile
    const dnPhpFile = ((downloadPHPName.toLowerCase()).indexOf(".php") != -1) ? (downloadPHPName) : (downloadPHPName+".php");
    // get XHR
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            console.log("XMLHttpRequestStatus ok");
        }
        else{
            console.log("XMLHttpRequestStatus not yet ok");
            console.log("readyState: ", xhttp.readyState);
            console.log("status: ", xhttp.status);
        }
    };
    // php
    var currPath =  getCurrentDir();
    console.log("current path:", currPath);
    var dnFileName = dnPhpFile;
    var dnFilePath = currPath + dnFileName;
    if(dnFilePath){
        xhttp.open("GET", dnFilePath, true);
        xhttp.onload = function(){
            let response = responseHandler(xhttp);
            if(response === 1 || response === "1"){
                alert("檔案下載完成!");
            }
            else{
                alert(response);
            }
        };
        xhttp.send();
    }
}

// add img tag
function recordCardImgTag(dirName, imgFile){
    let img = imgFile;
    let imgTag = document.createElement("img");
    const imgDirName = dirName;
    const imgDirPath = getCurrentDir()+imgDirName+"/";
    imgTag.setAttribute("src", imgDirPath+img);
    imgTag.setAttribute("class", "recordimgs");
    let tmp = document.createElement("div");
    tmp.appendChild(imgTag);
    let imgTagHTML = tmp.innerHTML;
    return imgTagHTML;
}

/* collapse cards */
// add expRecord card div Tag
function addRecordCard(cardNum){
    // function parameters
    var hid = "heading"+cardNum;
    var cid = "collapse"+cardNum;
    // add "collapse header"-div class
    var headingDiv = document.createElement("div");
    headingDiv.className = "card-header lists-header py-1 px-1 bg-transparent";
    headingDiv.id = hid;
    // add "collpase header" child tag-"button"
    var buttonTag = document.createElement("button");
    buttonTag.className = "btn btn-link col text-decoration-none text-dark";
    buttonTag.setAttribute("type", "button");
    buttonTag.setAttribute("data-toggle", "collapse");
    buttonTag.setAttribute("data-target", "#"+cid);
    // add "button" child tag-"ul"
    var ulTag = document.createElement("ul");
    ulTag.className = "nav nav-justifyed justify-content";

    // add "collapse show"-div class
    var collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse bg-transparent bd-4 shadow-sm";
    collapseDiv.setAttribute("data-parent", "#"+hid);
    collapseDiv.id = cid;
    // add "collapse show" child tag-"card-body"
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var tableRespon = document.createElement("div");
    tableRespon.classNmae = "table-responsive";
    var table = document.createElement("table");
    table.className = "table";
    var tableHead = document.createElement("thead");
    tableHead.className ="d-none";
    var tableBody = document.createElement("thead");
    // append all children tag in collapse header-div
    buttonTag.appendChild(ulTag);
    headingDiv.appendChild(buttonTag);

    // append all children tag in collapse show-div
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    tableRespon.appendChild(table);
    cardBody.appendChild(tableRespon);
    collapseDiv.appendChild(cardBody);

    // append div in expRecordCard
    var expRecordCard = document.getElementById("expRecordCard");
    expRecordCard.appendChild(headingDiv);
    expRecordCard.appendChild(collapseDiv);

}

// add html text in li tag
function addRecordCardList(cardNum, recordListText){
    var hid = "heading"+cardNum;
    var t = recordListText;
    var ulTag = document.getElementById(hid).getElementsByTagName("ul")[0];
    var liTag = document.createElement("li");
    liTag.className = "col nav-item";
    liTag.innerText = t;
    ulTag.appendChild(liTag);
}

function addRecordCardTable(cardNum, recordTableTitle, recordTableText, textCheck){
    var cid = "collapse"+cardNum;
    var tt = recordTableTitle;
    var tx = recordTableText;
    var tableTag = document.getElementById(cid).getElementsByTagName("table")[0];
    var trTag = document.createElement("tr");
    var thTag = document.createElement("th");
    var txtCheck = textCheck;
    thTag.setAttribute("scope", "row");
    thTag.setAttribute("style", "width: 25%");
    thTag.innerText = tt;
    var tdTag = document.createElement("td");
    tdTag.setAttribute("style", "width: 75%");
    if(txtCheck == 1 || txtCheck == "1"){
        // const tmpTag = new DOMParser().parseFromString(tx,"text/html");
        let tmpTag = document.createElement("div");
        tmpTag.innerHTML = tx;
        let imgTag = tmpTag.firstChild;
        tdTag.appendChild(imgTag);
        console.log("innerHTML: ", imgTag);
    }
    else{
        tdTag.innerText = tx;
    }
    // Append Child
    trTag.appendChild(thTag);
    trTag.appendChild(tdTag);
    tableTag.appendChild(trTag);
}

// check and add expense form
function addExpenseForm(){
    // expense form
    var inputNum = expformAry.length;
    //迴圈檢查內容是否為有效值
    var chkCount = 0;
    for (let i=0; i<inputNum; i++){
        chkCount++;
        var aryNum = i;
        var getInputAry = expformAry[aryNum];
        var getFormName = getInputAry["name"];
        var getFormValue = getInputAry["value"];
        var getFormRequired = getInputAry["required"];
        var getFormtype = getInputAry["type"];
        var userInput = document.getElementById(getFormValue).value;
        // 檢查必填欄位
        if (getFormRequired === 1){
            if(chkInputRequired(userInput,getFormName) === true){
                getInputAry["check"] = true;
            }
            else{
                getInputAry["check"] = false;
                chkCount--;
                continue;   //必填欄位未填直接跳過檢查金額的動作
            }
        }
        else{
            getInputAry["check"] = true;
        }
        //輸入欄位在expformAry中的type屬性若為money就要檢查輸入值是否為正整數
        if (getFormtype === "money"){
            if(isPosInteger(userInput) === true){
                getInputAry["check"] = true;
            }
            else{
                getInputAry["check"] = false;
                alert(getFormName+"請輸入正整數");
                chkCount--;
                continue;   //必填欄位未填直接跳過下面動作
            }
        }
    }
    //迴圈檢查完輸入內容就存入陣列expRecordAry && 加入collapse card
    if (chkCount === expformAry.length){
        // 取得目前消費紀錄清單數
        var recordNum = expRecordAry.length;
        // 新增要顯示在消費紀錄清單的collapse card
        recordNum++;
        addRecordCard(recordNum);
        // 建立暫存物件
        var tempObj = {}; 
        tempObj["heading"] = "heading"+(recordNum);
        tempObj["collapse"] = "collapse"+(recordNum);
        for(let i=0; i<inputNum; i++){
            var aryNum = i;
            var getInputAry = expformAry[aryNum];
            var getFormName = getInputAry["name"];
            var getFormField = getInputAry["field"];
            var getFormValue = getInputAry["value"];
            var getFormChk = getInputAry["check"];
            var getFormHeading = getInputAry["heading"];
            var userInput = document.getElementById(getFormValue).value;
            // if-else 如果檢查值是true才能存入物件
            if(getFormChk === true){
                // cards主頁面(新增li到collapse card-heading)
                if(getFormHeading === 1){
                    if(getFormField === "type"){
                        switch(userInput){
                            case "1":
                                addRecordCardList(recordNum, "收入");
                                break;
                            case "0":
                                addRecordCardList(recordNum, "支出");
                                break;                    
                        }
                    }
                    // 類別欄位(顯示名稱寫死)
                    else if(getFormField === "category"){
                        switch(userInput){
                            case "1":
                                addRecordCardList(recordNum, "食物");
                                break;
                            case "2":
                                addRecordCardList(recordNum, "生活");
                                break;
                            case "3":
                                addRecordCardList(recordNum, "交通");
                                break;
                            case "4":
                                addRecordCardList(recordNum, "住宿");
                                break;
                            case "5":
                                addRecordCardList(recordNum, "教育");
                                break;                                                                             
                            case "6":
                                addRecordCardList(recordNum, "遊樂");
                                break;
                        }           
                    }
                    else{
                        addRecordCardList(recordNum, userInput);
                    }
                }
                // cards收合頁面
                else{
                    // 照片欄位
                    if(getFormField === "picture"){
                        // 上傳圖片
                        uploadFile("uploadPicture_bk.php", "inputPicture", "newExpenseForm", "value", "1");
                        let inputValue = document.getElementById("inputPicture").getAttribute("value");
                        // console.log("text msg: 取得的inputValue值 ",inputValue);
                        if(inputValue === "1" || inputValue === 1){
                            let upFileName = document.getElementById("inputPicText").textContent;
                            // 顯示照片
                            let picInput = recordCardImgTag("file", upFileName);
                            addRecordCardTable(recordNum, getFormName, picInput, 1);
                        }
                        else{
                            addRecordCardTable(recordNum, getFormName, "", 0);
                        }
                    }
                    else{
                        addRecordCardTable(recordNum, getFormName, userInput, 0);
                    }
                }
                // 暫存物件tempObj
                if(getFormField === "money"){
                    // 強迫金錢存入物件值的型態為integer
                    var userInputInt = parseInt(userInput);
                    tempObj[getFormField] = userInputInt;
                }
                else{
                    tempObj[getFormField] = userInput;
                }
            }
        }
        // tempObj再存入expense record array
        expRecordAry.push(tempObj);
        console.log("test msg: 消費紀錄筆數目前後台共記錄 "+expRecordAry.length+"筆");
        alert("消費記錄儲存成功");
        $(function(){
            $('#addExpenseModal').modal('hide');
        });
    }
}

// recalculate monthly balance
function calcMonthlyBalance(p){
    var returnPara = p;
    var expRecordAryNum = expRecordAry.length;
    var income = 0;
    var expend = 0;
    var balance = 0;
    for(let i=0; i<expRecordAryNum; i++){
        var aryNum = i;
        var getRecordAry = expRecordAry[aryNum];
        var getRecordType = getRecordAry["type"];
        var getRecordMoney = getRecordAry["money"];
        if(getRecordType == 1 || getRecordType == "1"){
            income += getRecordMoney;
        }
        else if(getRecordType == 0 || getRecordType == "0"){
            expend += getRecordMoney;
        }
        else{
            console.log("error msg: error number");
        }
    }
    balance = income - expend;
    document.getElementById("monthIncomeSum").innerText = income;
    document.getElementById("monthExpendSum").innerText = expend;
    document.getElementById("monthBalanceSum").innerText = balance;
    switch (returnPara){
        case 0: 
            return balance;
            break;
        case 1:
            return income;
            break;
        case -1:
            return expend;
            break;
        default: 
            break;
    } 
}

// recalculate monthly budget and residuals
function calcMonthlyBudget(){
    var budget = document.getElementById("budgetNum");
    var expense = document.getElementById("currentExpense");
    var balance = document.getElementById("currentBalance");
    var currBudget = budget.innerText;
    console.log("currBudget: "+currBudget);
    if (typeof(currBudget) !== "undefined"){
        if(currBudget !== "尚未設定預算"){
            let currExpend = calcMonthlyBalance(-1);
            let currBalance = currBudget - currExpend;
            console.log("取得的目前支出: "+currExpend);
            expense.innerText = currExpend;
            balance.innerText = currBalance;
            // 花費超支設定預算時跳出提醒
            if(currBalance < 0){ 
               alert("提醒！本月花費已超支設定預算！"); 
            }
        }
    }
    else{
        console.log("error msg: error data type");
    }
}


/*=========================== Main Function  ============================*/
// submit budget form
function subBudgetForm(){
    var budgetElement = document.getElementById("inputBudget");
    var budgetNum = budgetElement.value;
    if(valueIsNull(budgetNum) !== true){
        if (isPosInteger(budgetNum) === true){
            document.getElementById("budgetNum").innerHTML = budgetNum;
            alert("預算設定成功");
            $('#addBudgetModal').modal('hide');
            document.getElementById("add-budget-btn").style.display="none";
            document.getElementById("budgetDoller").style.display="block";
        }
        else{
            alert("請輸入正整數");
        }
    }
    else{
        alert("請輸入數值");
    }
    setDefaultFormValue();
    calcMonthlyBudget();
}

// submit, check and clear expense form
function subExpenseForm(){
    // 檢查前先恢復表單欄位檢查值的預設狀態(false)
    setDefaultCheckValue();
    // 新增表單欄位
    addExpenseForm();
    // 重新計算每月收支
    calcMonthlyBalance("n");
    // 統計預算餘額
    var chkBalance = document.getElementById("budgetNum").innerText;
    if (chkBalance !== "尚未設定預算"){
        calcMonthlyBudget();
    }
}

