import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import SVGIcon from '@/components/common/svg-icon/SVGIcon';

/**
 * 
 * @param {string} href - href for the link 
 * @param {string} text - text for the link 
 */
function BreadcrumsItem(props){
    const {href, text} = props;
    return (
       <Link to={href}>{text}</Link>
    );
};

/**
 * 
 * @param {number} itemsBeforeCollapse - No. of BreadcrumsItem to be displayed before the "..." (three dots)
 * @param {number} itemsAfterCollapse - No. of BreadcrumsItem to be displayed after the "..." (three dots)
 * @param {BreadcrumsItem} children - Pass any many Breadcrums needed as children. 
 * @param {boolean} isExpanded - show even if there are more than 8 BreadcrumsItem.
 */
function Breadcrums(props){
    let {itemsBeforeCollapse, itemsAfterCollapse} = props;
    let len = props.children.length
    var itemsBefore=[], itemsAfter=[];

    const [isExpanded, setIsExpanded] = useState(props.isExpanded);

    function toggleIsExpanded(){
        setIsExpanded(true);
    }

    if(props.children.$$typeof){
        return props.children
    }

    if(len < 8 || isExpanded){
        return <div className='flex flex-wrap gap-1 w-8/12'>
            {
                props.children.map((child,index) => {
                    if(index === len-1){
                        return <div key={index}>{child}</div>
                    }
                    return (
                        <div key={index} className='flex items-center justify-start'> 
                            {child} 
                            <SVGIcon className="w-6 h-6 mt-0.5" icon="angle-right" />
                        </div>
                    );
                })
            }
        </div>
    }

    if(itemsBeforeCollapse){
        for(let i=0;i<itemsBeforeCollapse;i++){
            itemsBefore.push(
                <div key={i} className='flex items-center justify-start'> 
                    {props.children[i]} 
                    <SVGIcon className="w-6 h-6 mt-0.5" icon="angle-right" />
                </div>
            )
        }
    }

    if(itemsAfterCollapse){
        for(let i=len-1;i>len-1-itemsAfterCollapse;i--){
            itemsAfter.push(
                <div key={i} className='flex items-center justify-start'> 
                    <SVGIcon className="w-6 h-6 mt-0.5" icon="angle-right" />
                    {props.children[i]} 
                </div>
            )
        }
    }

    return (
        <div className='flex flex-wrap gap-1 w-8/12'>
            {
                itemsBeforeCollapse
                ? itemsBefore
                : <div className='flex items-center justify-start'> 
                    {props.children[0]} 
                    <SVGIcon className="w-6 h-6 mt-0.5" icon="angle-right" />
                  </div>
            }
            <span className='cursor-pointer' onClick={toggleIsExpanded}>...</span> 
            {
                itemsAfterCollapse
                ? itemsAfter
                : <div className='flex items-center justify-start'> 
                    <SVGIcon className="w-6 h-6 mt-0.5" icon="angle-right" />
                    {props.children[len-1]} 
                  </div>
            }
        </div>
    );
};

export {BreadcrumsItem};

export default Breadcrums;