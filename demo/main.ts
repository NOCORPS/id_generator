import { generateId, userId, contentId, urlId } from '../src/index';

// Elements
const outputEl = document.getElementById('id-output') as HTMLDivElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
const typeBtns = document.querySelectorAll('.segmented-control button');
const lengthInput = document.getElementById('length-input') as HTMLInputElement;
const prefixInput = document.getElementById('prefix-input') as HTMLInputElement;
const toast = document.getElementById('toast') as HTMLDivElement;
const presetBtns = document.querySelectorAll('.preset-card');

let currentType: any = 'alphanumeric';

// Functions
function updateId() {
    const length = parseInt(lengthInput.value) || 16;
    const prefix = prefixInput.value;
    
    const id = generateId({
        length,
        type: currentType,
        prefix
    });
    
    outputEl.textContent = id;
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// Event Listeners
generateBtn.addEventListener('click', () => {
    updateId();
    // Add a little animation
    outputEl.style.opacity = '0';
    setTimeout(() => {
        outputEl.style.opacity = '1';
    }, 50);
});

copyBtn.addEventListener('click', () => {
    const text = outputEl.textContent || '';
    navigator.clipboard.writeText(text).then(showToast);
});

typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.getAttribute('data-type');
        updateId();
    });
});

[lengthInput, prefixInput].forEach(input => {
    input.addEventListener('input', updateId);
});

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const preset = btn.getAttribute('data-preset');
        let id = '';
        
        if (preset === 'userId') {
            id = userId();
            lengthInput.value = '12';
            prefixInput.value = 'user_';
            typeBtns[0].click();
        } else if (preset === 'contentId') {
            id = contentId();
            lengthInput.value = '16';
            prefixInput.value = 'cnt_';
            typeBtns[0].click();
        } else if (preset === 'urlId') {
            id = urlId();
            lengthInput.value = '8';
            prefixInput.value = '';
            typeBtns[0].click();
        }
        
        outputEl.textContent = id;
    });
});

// Initial ID
updateId();
