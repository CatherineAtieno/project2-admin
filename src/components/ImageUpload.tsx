import {ActionIcon, Fieldset, Flex, Image, Text, Title} from "@mantine/core";
import {Dropzone, FileWithPath} from "@mantine/dropzone";
import {ImImage} from "react-icons/im";
import React from "react";
import {BiX} from "react-icons/bi";


interface props {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<BusinessObj>>
}

export default function ImageUpload({images, setImages}: props) {

    const handle = (files: FileWithPath[]) => {
        console.log("Files: ", files)
        // const uploaded: string[] = []
        // const reader = new FileReader();
        // for (const file of files) {
        //     reader.onloadend = (input) => {
        //         const fileString = input.target?.result;
        //         if (fileString) {
        //             uploaded.push(fileString.toString())
        //         }
        //     }
        //     reader.readAsDataURL(file)
        // }
        setImages(prev => ({...prev, images: files}))
    }
    const remImage = (index: number) => {
        const hold = images.filter((_s, i) => i !== index)
        setImages(prev => ({...prev, images: hold}))
    }

    return (
        <Fieldset legend={'Upload images'} className={'grid gap-2'}>
            <Dropzone
                onDrop={handle}
                accept={["image/*"]}
            >
                <Dropzone.Idle>
                    <Flex gap={5} justify={'center'}>
                        <ImImage className={'mt-auto mb-auto'}/>
                        <Title size={18}>Drop images here</Title>
                    </Flex>
                </Dropzone.Idle>
                <Dropzone.Reject>
                    <Text>File not accepted</Text>
                </Dropzone.Reject>
            </Dropzone>
            <div className={'w-full grid grid-cols-4 max-h-[100px] gap-2'}>
                {images.map((img, i) => <div key={i} className={'w-full h-full '}>
                        <ActionIcon onClick={() => remImage(i)} color={'red'} variant={'filled'}
                                    className={'absolute z-10 right-0 m-1'}>
                            <BiX/>
                        </ActionIcon>
                        <Image className={'w-full h-full z-0 object-cover'} src={URL.createObjectURL(img)}/>
                    </div>
                )}
            </div>
        </Fieldset>
    )
}

