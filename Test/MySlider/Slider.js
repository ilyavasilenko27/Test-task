class Slider{
    _slider;
    _input;
    _min;
    _max;

    constructor(min, max, sliderId, inputid){
        this._min = min;
        this._max = max;
        this._container = document.querySelector(`#${sliderId}`);
        this._container.classList.add("slider-container");
        this.render(min, max);
        this._slider = this._container.querySelector("input");
        this._input = document.querySelector(`#${inputid}`);
        this._slider.min = min;
        this._slider.max = max;
        this.change();
        this._slider.value = min;
        this._input.value = this._slider.value;
    }

    change(){
        this._slider.addEventListener("mousemove", (e)=>{
            this._input.value = this._slider.value;
        });

        this._input.addEventListener("keyup", (e)=>{
            this._slider.value = this._input.value;
        });
    }

    render(min, max){
        let sliderHTML = `<span class="slider_text">${min} руб.</span><input type="range" class="slider" step="1000" min="${min}" max="${max}"><span class="slider_text">${max}</span>`;
        this._container.innerHTML += sliderHTML;
    }
}