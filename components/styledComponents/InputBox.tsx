import { InputProps } from "@/model/styledComponents/inputBox";
import styles from "../../styles/InputBox.module.css"



function InputBox({id, title, type, name, placeHolder, onChange, backgroundColor, titleFontSize, titleFontColor}: InputProps) {
    return(
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id} style={{ fontSize: titleFontSize, color: titleFontColor }}>
                {title}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                placeholder={placeHolder}
                onChange={(e) => onChange(e.target.value)}
                style={{ backgroundColor }}
                className={styles.inputBox}
            />
        </div>
    )
}

export default InputBox