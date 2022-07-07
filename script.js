// COLORS
const mainColorPicker = document.querySelector('#color');
const mainColorValue = document.querySelector('#colorValue');

const backgroundColorPicker = document.querySelector('#bgColor');
const backgroundColorValue = document.querySelector('#bgColorValue');

const updateColor = e => {
    const value = e.target.value;
    mainColorValue.innerText = value;
};

const updateBackgroundColor = e => {
    const value = e.target.value;
    backgroundColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateColor);
    backgroundColorPicker.addEventListener('change', updateBackgroundColor);
};

addColorPickerEventListeners();

// SLIDERS
const sizeSlider = document.querySelector('#size');
const sizeValue = document.querySelector('#sizeValue');

const marginSlider = document.querySelector('#margin');
const marginValue = document.querySelector('#marginValue');

const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = `${value} x ${value}`;
};

const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px`;
};

const addSliderEventListeners = () => {
    sizeSlider.addEventListener('change', updateSize);
    marginSlider.addEventListener('change', updateMargin);
};

addSliderEventListeners();

// URL / TEXT / DATA
const dataInput = document.querySelector('#data');
// FORMAT
const imageFormat = document.querySelector('input[name="format"]:checked');
// BUTTON
const submitButton = document.querySelector('#ctaButton');

const prepareParameters = params => {
    const prepared = {
        data: params.data,
        size: `${params.size}x${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qZone,
        format: params.format,
    };

    return prepared;
};

const settingsContainer = document.querySelector('#qrCodeSettings');
const resultsContainer = document.querySelector('#qrCodeResult');
const qrCodeImage = document.querySelector('#qrCodeImage');

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped');
    resultsContainer.classList.add('flipped');

    qrCodeImage.setAttribute('src', imgUrl);
};

const getQrCode = parameters => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const urlParams = new URLSearchParams(parameters).toString();

    const fullUrl = `${baseUrl}?${urlParams}`;

    fetch(fullUrl).then(response => {
        if (response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
};

const showInputError = () => {
    dataInput.classList.add('error');
};

const dataInputEventListener = () => {
    dataInput.addEventListener('change', e => {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};

dataInputEventListener();

const onSubmit = () => {
    const data = dataInput.value;
    if (!data.length) {
        return showInputError();
    }

    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const size = sizeSlider.value;
    const qZone = marginSlider.value;
    const format = imageFormat.value;

    const parameters = prepareParameters({ data, color, bgColor, size, qZone, format });

    getQrCode(parameters);
};

const addSubmitEventListener = () => {
    submitButton.addEventListener('click', onSubmit);
};

addSubmitEventListener();

const editButton = document.querySelector('#editButton');

const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultsContainer.classList.remove('flipped');
};

const addEditEventListener = () => {
    editButton.addEventListener('click', onEdit);
};

addEditEventListener();
