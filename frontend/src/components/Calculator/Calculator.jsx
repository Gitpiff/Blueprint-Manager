import { useState } from 'react';
import { create, all } from 'mathjs';
import './Calculator.css'

const math = create(all);

const CalculatorModal = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const handleInput = (value) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput('');
        setResult(null);
    };

    const handleBackspace = () => {
        setInput(input.slice(0, -1));
    };

    const handleEquals = () => {
        try {
            const evaluatedResult = math.evaluate(input);
            setResult(evaluatedResult);
        } catch (error) {
            setResult('Error');
        }
    };

    return (

            <div className="calculator">
                <div className="display">
                    {result !== null ? result : input}
                </div>
                <div className="caclculator-buttons">
                    <button className='calc-button' onClick={() => handleInput('1')}>1</button>
                    <button className='calc-button' onClick={() => handleInput('2')}>2</button>
                    <button className='calc-button' onClick={() => handleInput('3')}>3</button>
                    <button className='calc-button' onClick={() => handleInput('+')}>+</button>
                    <button className='calc-button' onClick={() => handleInput('4')}>4</button>
                    <button className='calc-button' onClick={() => handleInput('5')}>5</button>
                    <button className='calc-button' onClick={() => handleInput('6')}>6</button>
                    <button className='calc-button' onClick={() => handleInput('-')}>-</button>
                    <button className='calc-button' onClick={() => handleInput('7')}>7</button>
                    <button className='calc-button' onClick={() => handleInput('8')}>8</button>
                    <button className='calc-button' onClick={() => handleInput('9')}>9</button>
                    <button className='calc-button' onClick={() => handleInput('*')}>*</button>
                    <button className='calc-button' onClick={handleClear}>AC</button>
                    <button className='calc-button' onClick={() => handleInput('0')}>0</button>
                    <button className='calc-button' onClick={handleBackspace}>&larr;</button>
                    <button className='calc-button' onClick={() => handleInput('/')}>/</button>
                    <button className='calc-button' style={{backgroundColor: "#e67e22"}} onClick={handleEquals}>=</button>
                </div>
            </div>
        
    );
};

export default CalculatorModal;