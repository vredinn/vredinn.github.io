document.addEventListener("DOMContentLoaded", () => {
    
    fetch("/js/cakeOptions.json")
        .then(response => response.json())
        .then(data => {
            window.cakeOptions = data;
            addLayer(); // Добавляем первый ярус сразу при загрузке
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));

    document.querySelector(".button_add-layer").addEventListener("click", addLayer);
    
    document.querySelector("#comment").addEventListener("change", ()=>{
        if(document.querySelector("#comment").value.trim()){
            document.querySelector("#cake-info__comment").textContent = "Дополнительный комментарий: " + document.querySelector("#comment").value;
        }else{
            document.querySelector("#cake-info__comment").textContent = "";
            document.querySelector("#comment").value = null;
        }
    });

    const orderBtn = document.querySelector(".button_order-custom");
    const modal = document.querySelector(".modal_custom");
    const modalForm = document.querySelector(".modal__form_custom");
    const cancelBtn = document.getElementById("order-cancel_custom");
    const submitBtn = document.getElementById("order-submit_custom");

    //Отображение/скрытие модального окна
    const toggleModalVisibility = () => {
        modal.classList.toggle("modal_active");
        modalForm.classList.toggle("modal__form_active");
    };
    modal.addEventListener('click', (event) => {
        if (!modalForm.contains(event.target)) {
          toggleModalVisibility();
        }
    });
    orderBtn.addEventListener('click', toggleModalVisibility);
      

    submitBtn.addEventListener('click', () => {
        toggleModalVisibility();
    });

    cancelBtn.addEventListener('click', () => {
        toggleModalVisibility();
    });

        const layers_info = document.querySelector('.cake-info__layers-info');
    
        layers_info.addEventListener("mousedown", (e) => {
            dragStart(e, layers_info);
    
            function onMouseMove(e) {
                dragging(e, layers_info);
            }
    
            function onMouseUp() {
                dragStop(layers_info);
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            }
    
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        });

});

      
let isDragging = false, startX, startScrollLeft;

// Начало перетаскивания
function dragStart(e, obj) {
    isDragging = false; // Изначально не считаем действие перетаскиванием
    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = obj.scrollLeft;
}

// Логика перетаскивания
function dragging(e, obj) {
    const currentX = e.pageX || e.touches[0].pageX;
    const diff = Math.abs(currentX - startX);

    if (diff > 1) { // Если движение достаточно значительное
        isDragging = true; // Считаем это перетаскиванием
        document.body.style.setProperty('cursor', 'grab');
    }

    if (isDragging) {
        obj.scrollLeft = startScrollLeft - (currentX - startX);
    }
}
// Остановка перетаскивания
function dragStop(obj) {
    setTimeout(() => {
        isDragging = false;
        document.body.removeAttribute('style'); 
    }, 0); // Немного задерживаем сброс для обработки click
}
    
function addLayer() {
    
    if (!window.cakeOptions) return;
    const layers = document.querySelectorAll(".layer");

    if (layers.length === 5) return;

    if (layers.length === 4) {        
        document.querySelector(".button_add-layer").classList.toggle("disabled");        
        document.querySelector(".button_add-layer").classList.toggle("button_center");
    }

    const layerContainer = document.createElement("div");
    layerContainer.classList.add("layer", "row", "mb-2", "align-items-center", "box-shadow");
        

    // Генерация HTML для наполнителя (радиокнопки)
    const fillingsOptions = window.cakeOptions.fillings.map(
        (filling, index) => `
        <label class="option mb-2">
            <input class="option__input layer__base" type="radio" name="filling__${layers.length + 1}" value="${filling.value}" data-price="${filling.price}" ${index === 0 ? 'checked' : ''}>
            <div class="option__card">
                <div class="option__name">
                    ${filling.name}
                </div>                
                <div class="option__price">
                    ${filling.price} руб/кг
                </div>
                <img src="${filling.image}" class="option__img option__img_circle" draggable="false">
                <div class="option__info">
                    ${filling.description}
                </div>
            </div>
        </label>`
    ).join("");

    // Генерация HTML для формы яруса (радиокнопки)
    const shapesOptions = window.cakeOptions.shapes.map(
        (shapes, index) => shapes.value == "shape_custom" ? `
        <label class="option mb-2">
            <input class="option__input layer__shape" type="radio" value="${shapes.value}" ${index === 0 ? 'checked' : ''}>
            <div class="option__card">
                <div class="option__name">                    
                    ${shapes.name}
                </div>
                <img src="${shapes.image}" class="option__img mb-2" draggable="false">
                <input class="layer__shape_custom custom-text" placeholder="Свой вариант" type="text" maxlength="100">
            </div>
        </label>` : `
        <label class="option mb-2">
            <input class="option__input layer__shape" type="radio" value="${shapes.value}" ${index === 0 ? 'checked' : ''}>
            <div class="option__card">
                <div class="option__name">                    
                    ${shapes.name}
                </div>
                <img src="${shapes.image}" class="option__img" draggable="false">
            </div>            
        </label>`
    ).join("");

    // Генерация HTML для начинки (чекбоксы)
    const ingredientsOptions = window.cakeOptions.ingredients.map(
        ingredient => ingredient.value == "ingridient_custom" ? `
        <label class="option mb-2">
            <input type="checkbox" class="option__input layer__ingredient" value="${ingredient.value}" data-price="${ingredient.price}">
            <div class="option__card">
                <div class="option__name">
                    ${ingredient.name} 
                </div>
                <div class="option__price">
                    +${ingredient.price} руб
                </div>
                <img src="${ingredient.image}" class="option__img mb-2" draggable="false" >
                <input type="text" maxlength="100" class="layer__custom-ingredient custom-text" placeholder="Свой вариант">
            </div>
        </label>` : `
        <label class="option mb-2">
            <input type="checkbox" class="option__input layer__ingredient" value="${ingredient.value}" data-price="${ingredient.price}">
            <div class="option__card">
                <div class="option__name">
                    ${ingredient.name} 
                </div>
                <div class="option__price">
                    +${ingredient.price} руб
                </div>
                <img src="${ingredient.image}" class="option__img" draggable="false">
                <div class="option__info"">
                    <p>${ingredient.description}</p>
                </div>
            </div>
        </label>`
    ).join("");

    
    // Генерация HTML для декора (чекбоксы и поле для "Свой вариант")
    const decorationsOptions = window.cakeOptions.decorations.map(
        decoration => decoration.value == "decoration_custom" ? `
        <label class="option mb-2">
            <input type="checkbox" class="option__input layer__decor" value="${decoration.value}" data-price="${decoration.price}">
            <div class="option__card">
                <div class="option__name">
                    ${decoration.name} 
                </div>
                <div class="option__price">
                    +${decoration.price} руб
                </div>
                <img src="${decoration.image}" class="option__img mb-2" draggable="false">
                <input type="text" maxlength="100" class="layer__custom-decoration custom-text" placeholder="Свой вариант">
            </div>
        </label>` : `
        <label class="option mb-2">
            <input type="checkbox" class="option__input layer__decor" value="${decoration.value}" data-price="${decoration.price}">
            <div class="option__card">
                <div class="option__name">
                    ${decoration.name} 
                </div>
                <div class="option__price">
                    +${decoration.price} руб
                </div>
                <img src="${decoration.image}" class="option__img" draggable="false">
                <div class="option__info">
                    ${decoration.description}
                </div>
            </div>
        </label>`
    ).join("");

    layerContainer.innerHTML = `
    <div class="layer__header">
        <h3 class="title title_pink text-center layer__title">Ярус ${document.querySelectorAll(".layer").length + 1}</h3><span class="layer__title-arrow"></span>
    </div>
        <div class="layer__options">   
            <div class="col-md-12 mb-2">
                <div class="layer__option-title title_pink">Вес яруса:</div>
                <div class="layer__weight-wrapper">
                    <input type="range" class="form-control layer__weight" value="0.5" step="0.5" min="0.5" max="10" oninput="rangeInput(this)"/>
                    <output id="weightvalue" class="layer__weight-value">
                        <span class="layer__weight-text">0.5 кг</span>
                    </output>
                </div>                
            </div>     
            <div class="row">
                <div class="col-lg-12 mb-2">
                    <div class="layer__option-title title_pink">Наполнитель:</div>
                    <div class="options-container">
                        ${fillingsOptions} 
                    </div> 
                </div>

                <div class="col-lg-12 mb-2">
                    <div class="layer__option-title title_pink">Форма яруса:</div>
                    <div class="options-container">                
                        ${shapesOptions}
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 mb-2">
                    <div class="layer__option-title title_pink">Начинка:</div>
                    <div class="options-container">
                        ${ingredientsOptions}
                    </div>
                </div>

                <div class="col-lg-12 mb-2">
                    <div class="layer__option-title title_pink text-center">Декор:</div>
                    <div class="options-container">
                        ${decorationsOptions}
                    </div>
                    
                </div>
            </div>

            <div class="col-12 mt-2 mb-2">
                <button class="button button_contrast button_remove-layer disabled">Удалить ярус</button>
            </div>
        </div>
    `;

    layerContainer.querySelector(".button_remove-layer").addEventListener("click", function() {
        const layers = document.querySelectorAll(".layer");
        
        if (layers.length === 5) {        
            document.querySelector(".button_add-layer").classList.remove("disabled");        
            document.querySelector(".button_add-layer").classList.add("button_center");
        }
        if (layers.length !== 1) {
            layerContainer.remove();
        }
        updateLayerNumbers();
        calculateTotal();
    });

    layerContainer.querySelectorAll(".option__input").forEach(input => {
        input.addEventListener("change", calculateTotal);
    });
    
    layerContainer.querySelectorAll(".custom-text").forEach(input => {
        input.addEventListener("change", () => {
            if(input.value){
                input.parentElement.parentElement.querySelector(".option__input").checked = true;
                calculateTotal();
            } 
        });
    });
    layerContainer.querySelectorAll(".layer__header").forEach(title => {
        title.addEventListener("click", () => {
            layerContainer.querySelector(".layer__title-arrow").classList.toggle("layer__title-arrow_hidden");
            layerContainer.querySelector(".layer__options").classList.toggle("layer__options_hidden");
        });
    });

    layerContainer.querySelectorAll('.options-container').forEach(options_container => {
        options_container.addEventListener("mousedown", (e) => {
            dragStart(e, options_container);
    
            function onMouseMove(e) {
                dragging(e, options_container);
            }
    
            function onMouseUp() {
                dragStop(options_container);
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            }
    
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        });
    
        // Предотвращение активации чекбоксов при перетаскивании
        options_container.addEventListener("click", (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    
        // Добавляем поддержку touch-событий
        options_container.addEventListener("touchstart", (e) => dragStart(e, options_container));
        options_container.addEventListener("touchmove", (e) => dragging(e, options_container));
        options_container.addEventListener("touchend", () => dragStop(options_container));
    });

    document.getElementById("layers-container").appendChild(layerContainer);    
    updateLayerNumbers();
    calculateTotal();
}

function rangeInput(object) {
    const output = object.nextElementSibling;
    const value = object.value;
    const min = object.min;
    const max = object.max;
    const valuePercent = `${100 - ((max - value) / (max - min) * 100)}%`;

    output.querySelector('.layer__weight-text').innerText = `${value} кг`;
    output.style.left =  `${valuePercent}`;
    output.style.transform = `translateX(-${valuePercent})`;    
    object.style.backgroundSize = `${valuePercent}`;
    calculateTotal();
}

function valueRound(object){    
    if (object.value > 10) object.value = 10;
    if (object.value < 0.5) object.value = 0.5;
    if (object.value < 1) object.value = Math.round(object.value  * 10) / 10;

}

function updateLayerNumbers() {
    const layers = document.querySelectorAll(".layer");
    

    if (layers.length >= 2) {        
        layers.forEach((layer, index) => {
            layer.querySelector(".button_remove-layer").classList.remove("disabled");        
            layer.querySelector(".button_remove-layer").classList.add("button_center");
        });
    } else{
        layers.forEach((layer, index) => {
            layer.querySelector(".button_remove-layer").classList.add("disabled");        
            layer.querySelector(".button_remove-layer").classList.remove("button_center");
        });
    }
    layers.forEach((layer, index) => {
        const title = layer.querySelector(".layer__title");
        title.textContent = `Ярус ${index + 1}`;
        console.log(layer.classList);
        layer.id = `layer_${index + 1}`;

        layer.querySelectorAll('.layer__base').forEach(input =>{
            input.name = `filling__${index + 1}`;
        });

        layer.querySelectorAll('.layer__shape').forEach(input =>{
            input.name = `shapes-${index + 1}`;
        });

        layer.querySelectorAll('layer__ingredient').forEach(input =>{
            input.name = `ingredients-${index + 1}`;
        });
        
        layer.querySelectorAll('layer__decor').forEach(input =>{
            input.name = `decor-${index + 1}`;
        });
    });
}

function calculateTotal() {
    let totalPrice = 0;
    let totalWeight = 0;
    let layerDetails = [];
    let totalLayers = 0;

    document.querySelectorAll(".layer").forEach(layer => {
        totalLayers++;

        let layerInfo = {
            filling: "",
            shape: "",
            ingredients: [],
            decorations: [],
            weight: 0,
            price: 0
        };

        const filling = layer.querySelector(".layer__base:checked");
        if (filling) {
            layerInfo.filling = filling.nextElementSibling.querySelector('.option__name').textContent.trim();
            layerInfo.price += parseFloat(filling.getAttribute("data-price")) || 0;
            layerInfo.weight = parseFloat(layer.querySelector(".layer__weight").value) || 1;
            totalWeight += Math.round(layerInfo.weight * 100) / 100;
            layerInfo.price *= layerInfo.weight;
        }

        const shape = layer.querySelector(".layer__shape:checked");
        if ((shape.value).includes("custom")) {
            layerInfo.shape = shape.nextElementSibling.querySelector('.custom-text').value;
        }else{
            layerInfo.shape = shape.nextElementSibling.querySelector('.option__name').textContent.trim();
        }

        const ingredients = layer.querySelectorAll(".layer__ingredient:checked");
        ingredients.forEach(ingredient => {            
            if((ingredient.value).includes("custom")){
                layerInfo.ingredients.push(ingredient.nextElementSibling.querySelector('.custom-text').value);
            }else{                
                layerInfo.ingredients.push(ingredient.nextElementSibling.querySelector('.option__name').textContent.trim());
            }
            layerInfo.price += parseFloat(ingredient.getAttribute("data-price")) || 0;
        });

        const decorations = layer.querySelectorAll(".layer__decor:checked");
        decorations.forEach(decor => {
            if((decor.value).includes("custom")){
                layerInfo.decorations.push(decor.nextElementSibling.querySelector('.custom-text').value);
            }else{                
                layerInfo.decorations.push(decor.nextElementSibling.querySelector('.option__name').textContent.trim());
            }
            layerInfo.price += parseFloat(decor.getAttribute("data-price")) || 0;
        });

        layerDetails.push(layerInfo);
        totalPrice += layerInfo.price;
    });

    document.getElementById("cake-info__details").textContent = `Итого: ярусов ${totalLayers}`;
    let layerText = layerDetails.map((layer, index) => {
        return `
            <div class="cake-info__layer box-shadow">
                <div class="cake-info__layer-title">Ярус ${index + 1}:</div>
                <div class="cake-info__layer-text">Наполнитель: ${layer.filling}</div>
                <div class="cake-info__layer-text">Форма яруса: ${layer.shape}</div>
                <div class="cake-info__layer-text">Начинка: ${layer.ingredients.join(", ") || "-"}</div>
                <div class="cake-info__layer-text">Декор: ${layer.decorations.join(", ") || "-"}</div>
                <div class="cake-info__layer-text">Вес яруса: ${layer.weight} кг</div>
                <a class="cake-info__layer-link" href="#layer_${index + 1}">Изменить</a>
            </div>
        `;
    }).join("");
    document.getElementById("cake-info__layers-info").innerHTML = layerText;
    document.getElementById("cake-info__weight").textContent = `Общий вес торта: ${totalWeight} кг`;
    document.getElementById("cake-info__price").textContent = `Примерная цена: ${totalPrice} руб.`;
}