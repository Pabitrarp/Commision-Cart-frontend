import { Component } from "react";
import {Dashboard} from "./Dashboard";
import { Adminsignin } from "./Adminsignin";
import { Alluserlist } from "./Alluserlist";
import { Orders } from "./Orders";

const adminroutes=[
{
    path:"/admin/dashboard",
    Component:Dashboard,
},
{
    path:"/admin/login",
    Component:Adminsignin,
},
{
    path:"/admin/users",
    Component:Alluserlist,
},
{
    path:"/admin/orders",
    Component:Orders,
},
]

export default adminroutes;