console.log("ready!");

let SELECTED_LI_TEXT = "bs-selected";
var selectArray = [];
// var removeFromArray = function (selectedValues, currentValue) {
//     return selectedValues.filter(a => a.value !== currentValue);
// };

// var printDOM = function () {
//     var selectedList = Object.assign([], selectedValues);
//     var selectedDom = document.getElementById("selected-list");
//     selectedDom.innerHTML = "";
//     selectedList.forEach(data => {
//         var node = document.createElement("li");
//         node.setAttribute("id", data.value);
//         var liSpan = document.createElement("span");
//         liSpan.className = "cross";
//         liSpan.appendChild(document.createTextNode("x"));
//         liSpan.onclick = function () {
//             selectedValues = removeFromArray(selectedValues, data.value);
//             var removedElement = selectBox.options[getSelectIndex(data.value)];
//             var removedLiElement = document.getElementById(data.value);
//             removeDOM(removedElement, removedLiElement)
//         };
//         node.appendChild(liSpan);
//         node.appendChild(document.createTextNode(data.text));
//         document.getElementById("selected-list").appendChild(node)
//
//     });
// };

var checkSelectedOption = function (selectBoxElement, ulElement, selectBoxId) {
    console.log(selectBoxElement.selectedOptions);
    console.log(selectBoxElement.selectedOptions.length);

    var selectedOptions = selectBoxElement.selectedOptions;
    for (i = 0; i < selectedOptions.length; i++) {
        var optionElement = selectedOptions[i];
        console.log(optionElement);
        var optionData = {
            value: optionElement.value,
            text: optionElement.label
        };

        //adding value to array
        selectArray[selectBoxId].push(optionData);

        addDOM(optionElement, ulElement, optionData);

        // var liElement = document.createElement("li");
        // liElement.setAttribute("id", SELECTED_LI_TEXT + optionElement.value);
        // var removeSpanElement = document.createElement("span");
        // removeSpanElement.className = "bs-cross";
        // removeSpanElement.appendChild(document.createTextNode("x"));
        // removeSpanElement.onclick = function () {
        //     // selectedValues = removeFromArray(selectedValues, optionElement.value);
        //     // var removedElement = optionElement;
        //     // var removedLiElement = document.getElementById(SELECTED_LI_TEXT + data.value);
        //     removeDOM(optionElement, liElement)
        // };
        //
        // liElement.appendChild(removeSpanElement);
        // liElement.appendChild(document.createTextNode(optionElement.label));
        // ulElement.appendChild(liElement);
    }
    // for (var selectedOption in selectBoxElement.selectedOptions) {
    //     console.log("++++");
    //     console.log(selectedOption);
    //     console.log("++++");
    //     var liElement = document.createElement("li");
    //     liElement.setAttribute("id", selectedOption.value);
    //
    //
    //     var removeSpanElement = document.createElement("span");
    //     removeSpanElement.className = "bs-cross";
    //     removeSpanElement.appendChild(document.createTextNode("x"));
    //
    //     liElement.appendChild(removeSpanElement);
    //     liElement.appendChild(document.createTextNode(selectedOption.text));
    //     ulElement.appendChild(liElement);
    // }
};

var removeDOM = function (selectElement, listElement) {
    selectElement.classList.remove("active-select");
    selectElement.removeAttribute("selected");
    listElement.remove();
};

var addDOM = function (optionElement, ulElement, data) {
    var liElement = document.createElement("li");
    liElement.setAttribute("id", SELECTED_LI_TEXT + data.value);
    var removeSpanElement = document.createElement("span");
    removeSpanElement.className = "bs-cross";
    removeSpanElement.appendChild(document.createTextNode("x"));
    removeSpanElement.onclick = function () {
        removeDOM(optionElement, liElement)
    };

    liElement.appendChild(removeSpanElement);
    liElement.appendChild(document.createTextNode(data.text));
    ulElement.appendChild(liElement);
    // document.getElementById("selected-list").appendChild(node);

    optionElement.classList.add("active-select");
    optionElement.setAttribute("selected", "selected");
    // var selectAttribute = document.createAttribute("selected");
    // optionElement.setAttributeNode(selectAttribute);
};

// var onClick = function () {
//     var currentValue = this.value;
//     var selectedOption = this.options[this.selectedIndex];
//
//     if (selectedValues.find(data => data.value === currentValue)) {
//         var removedLiElement = document.getElementById(SELECTED_LI_TEXT + currentValue);
//         removeDOM(selectedOption, removedLiElement);
//         selectedValues = removeFromArray(selectedValues, currentValue);
//     } else {
//         var map = {
//             value: currentValue,
//             text: currentText
//         };
//         selectedValues.push(map);
//         addDOM(selectedOption, map)
//     }
// };

// var getSelectIndex = function (value) {
//     var index = -1;
//     for (i = 0; i <= selectBox.length; i++) {
//         if (selectBox.options[i].value === value) {
//             index = i;
//             break;
//         }
//     }
//     return index;
// };


function bs(selectBoxId) {
    console.log(selectArray.length);
    selectArray.push(selectBoxId);
    console.log(selectArray);
    // console.log(this);

    let selectBox = document.getElementById(selectBoxId);
    console.log(selectBox);

    var mainSpan = document.createElement("span");
    mainSpan.id = "bs-main-span-" + selectBoxId;
    selectBox.after(mainSpan);

    var ulElement = document.createElement("ul");
    ulElement.id = "bs-selected-list-" + selectBoxId;
    mainSpan.appendChild(ulElement);

    selectBox.onclick = function () {
        var selectedOption = this.options[this.selectedIndex];
        var currentText = selectedOption.text;
        var currentValue = selectedOption.value;

        console.log(selectedOption);
        console.log(this.options);
        console.log(currentValue, currentText);
        if (selectArray[selectBoxId].find(data => data.value === currentValue)) {
            var removedLiElement = document.getElementById(SELECTED_LI_TEXT + currentValue);
            selectArray[selectBoxId] = selectArray[selectBoxId].filter(data => data.value !== currentValue);
            removeDOM(selectedOption, removedLiElement);
            // selectedValues = removeFromArray(selectedValues, currentValue);
        } else {
            var map = {
                value: currentValue,
                text: currentText
            };
            selectArray[selectBoxId].push(map);
            addDOM(selectedOption, ulElement, map)
        }
    };

    selectArray[selectBoxId] = [];
    checkSelectedOption(selectBox, ulElement, selectBoxId);
}


//from user section
bs("select-multiple");



