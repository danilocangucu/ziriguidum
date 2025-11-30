import styles from './button.module.css'

function Button({ type, onClick, children, classname }: { type: "button" | "submit" | "reset"; onClick?: () => void; children: React.ReactNode; classname?: string }) {
  return (
    <button className={`${styles.button} ${classname || ''}`} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
