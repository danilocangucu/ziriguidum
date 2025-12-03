import styles from './button.module.css'

function Button({ type, onClick, children, className }: { type: "button" | "submit" | "reset"; onClick?: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button className={`${styles.button} ${className || ''}`} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button