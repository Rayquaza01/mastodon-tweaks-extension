import { HashtagHighlightMode } from "../OptionsInterface";
import React from "react";

export interface HashtagListProps {
    visible: boolean;
    mode: HashtagHighlightMode
    color: string
    background: string
    hashtags: string[]
}

export function HashtagList(props: HashtagListProps) {
    return (
        <div className="hashtagList" style={{ display: props.visible ? undefined : "none" }}>
            { props.hashtags.map(item => <Hashtag tag={item} mode={props.mode} color={props.color} background={props.background} key={item} />) }
            { props.hashtags.length === 0 && "No hashtags listed" }
        </div>
    );
}

export interface HashtagProps {
    tag: string
    mode: HashtagHighlightMode
    color: string
    background: string
}

export function Hashtag(props: HashtagProps) {
    const style: React.CSSProperties = {};
    switch (props.mode) {
        case HashtagHighlightMode.COLOR:
            style.color = props.color;
            break;
        case HashtagHighlightMode.BACKGROUND:
            style.background = props.background;
            style.backgroundClip = "text";
            style.WebkitTextFillColor = "transparent";
            break;
    }

    console.log(props.tag, props.mode);

    return (
        <span className="hashtag" style={style}>#{props.tag}</span>
    );
}
