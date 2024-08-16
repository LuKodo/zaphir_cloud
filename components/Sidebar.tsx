import { Fragment, useMemo, useState } from "react"
import { Category } from "../interfaces/interfaces"

export const Sidebar = ({ setCategory, categoryactive }: { setCategory: Function, categoryactive: Category }) => {
    const [categories, setCategories] = useState([] as Category[])

    const getCategories = async () => {
        const response = await fetch('/api/categoria')
        const data = await response.json()
        setCategories(data.data)
    }

    useMemo(() => getCategories(), [])

    return (
        <Fragment>
            {
                categories?.map((category: Category, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => setCategory(category)}
                            className="list-group-item d-flex justify-content-between align-items-center py-1"
                        >
                            <span
                                className={`px-2 ${category.descripcion === categoryactive.descripcion ? 'fw-bold text-bg-success ' : ''}`}
                            >
                                {category.descripcion}
                            </span>
                        </li>
                    )
                })
            }
        </Fragment>
    )
}