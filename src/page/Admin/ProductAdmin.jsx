import React from 'react'
import { Space, Table, Tag, Button } from 'antd';
const { Column, ColumnGroup } = Table
const ProductAdmin = () => {
    return (
        <div>
            <Table >
                <ColumnGroup title="Name">
                    <Column title="First Name" dataIndex="firstName" key="firstName" />
                    <Column title="Last Name" dataIndex="lastName" key="lastName" />
                </ColumnGroup>
                <Column title="Age" dataIndex="age" key="age" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                    title="Action"
                    key="action"
                    render={() => {
                        <Button
                            type="primary"
                            onClick={() => {
                                console.log("Delete")
                            }}
                        >Delete</Button>
                    }}
                />
                
            </Table>
        </div>
    )
}

export default ProductAdmin