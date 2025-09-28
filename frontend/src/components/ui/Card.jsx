import * as React from 'react'
import {cn} from './utils'

function Card({className, ...props}){
    return(
        <div dataslot="card" className={cn(className)} {...props}/>
    );
}

function CardHeader({className, ...props}){
    return(
        <div data-slot="card-header" className={cn(className)} {...props}></div>
    )
}

function CardTitle({className, ...props}){
    return(
        <h4 data-slot='card-title' className={cn(className)} {...props}>
        </h4>
    )
}

function CardDescription({className, ...props}){
    return(
        <p data-slot='card-description' className={cn(className)} {...props}>
        </p>
    )
}
function CardContent({className, ...props}){
    return(
        <div data-slot='card-content' className={cn(className)} {...props}></div>
    )
}

export{
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
};