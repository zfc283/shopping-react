import ReactDOM from 'react-dom/client';


const modalStyle = {
    display: 'table',
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    marginLeft: '-1.5rem',
    marginTop: '-0.5rem',
    width: '3rem',
    height: '1rem',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '.08rem'
}

const modalTextStyle = {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center' as const,
    fontSize: '.16rem',
    color: '#FFF',
    padding: '.2rem'
}


const element = document.createElement('div');
const root = ReactDOM.createRoot(element);

export const message = (message: string, timeout = 1500) => {
    root.render(
        <div style={modalStyle}>
            <div style={modalTextStyle}>{message}</div>
        </div>
    );
    if (!element.parentNode) {
        document.body.appendChild(element);
        setTimeout(() => {
            document.body.removeChild(element)
        }, timeout);
    }
}

