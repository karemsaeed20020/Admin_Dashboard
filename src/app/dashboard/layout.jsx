import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from '../ui/dashboard/dashboard.module.css'
import { AuthProvider } from "../context/authcontext"
const Dashboard1 = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <AuthProvider>
          <Sidebar />
        </AuthProvider>
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default Dashboard1
