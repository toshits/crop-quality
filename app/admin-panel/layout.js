import TopSection from "@/component/TopSection";

export default function AdminLayout({ children }) {
    return (
        <div>
            <TopSection />
            {children}
        </div>
    )
}