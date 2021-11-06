import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function withRouter(RoutedObject, newProps) {
    return (props) => {
        return (
            <RoutedObject {...props} {...newProps} location={useLocation()} params={useParams()} />
        );
    }
}