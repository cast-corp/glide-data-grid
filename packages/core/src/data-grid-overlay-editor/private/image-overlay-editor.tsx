import * as React from "react";
import { ImageOverlayEditorStyle } from "./image-overlay-editor-style";
import { Carousel } from "react-responsive-carousel";
import { EditPencil } from "../../common/utils";

/** @category Types */
export interface OverlayImageEditorProps {
    readonly url: string;
    readonly canWrite: boolean;
    readonly onCancel: () => void;
    readonly onChange: (newImage: string) => void;
    readonly onEditClick?: () => void;
    readonly renderImage?: (url: string) => React.ReactNode;
}

/** @category Renderers */
export const ImageOverlayEditor: React.FunctionComponent<OverlayImageEditorProps> = p => {
    const { url, canWrite, onEditClick, renderImage } = p;

    if (url.length === 0) {
        return null;
    }


    const allowMove = url.length > 1;
    
    return (
        <ImageOverlayEditorStyle data-testid="GDG-default-image-overlay-editor">
            <Carousel
                showArrows={allowMove}
                showThumbs={false}
                swipeable={allowMove}
                emulateTouch={allowMove}
                infiniteLoop={allowMove}>
                {
                    [<div className="gdg-centering-container" key={url}>
                        {renderImage?.(url) ?? <img draggable={false} src={url} />}
                    </div>]
                }
            </Carousel>
            {canWrite && onEditClick && (
                <button className="gdg-edit-icon" onClick={onEditClick}>
                    <EditPencil />
                </button>
            )}
        </ImageOverlayEditorStyle>
    );
};
