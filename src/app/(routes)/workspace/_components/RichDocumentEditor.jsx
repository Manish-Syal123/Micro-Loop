import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import SimpleImage from "simple-image-editorjs";
import LinkTool from "@editorjs/link";
import CodeTool from "@editorjs/code";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import GenerateAITemplate from "./GenerateAITemplate";

const RichDocumentEditor = ({ params }) => {
  const ref = useRef();
  const { user } = useUser();
  let editor;
  let isFetched = false;

  useEffect(() => {
    user && InitEditor();
  }, [user]);

  const SaveDocument = () => {
    try {
      ref.current.save().then(async (outputData) => {
        // console.log("Article data: ", outputData);
        const docRef = doc(db, "documentOutput", params?.documentid);
        await updateDoc(docRef, {
          output: JSON.stringify(outputData),
          editedBy: user?.primaryEmailAddress?.emailAddress,
        });
      });
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(
      doc(db, "documentOutput", params?.documentid),
      (doc) => {
        if (
          doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress ||
          isFetched == false
        )
          doc.data().editedBy && editor?.render(JSON.parse(doc.data()?.output));
        isFetched = true;
      }
    );
  };

  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        onChange: (api, event) => {
          SaveDocument();
        },
        onReady: () => {
          GetDocumentOutput();
        },
        holder: "editorjs",
        tools: {
          header: Header,
          delimiter: Delimiter,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+A",
            config: {
              alertTypes: [
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger",
                "light",
                "dark",
              ],
              defaultType: "primary",
              messagePlaceholder: "Enter something",
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          // list: {
          //   class: NestedList,
          //   inlineToolbar: true,
          //   config: {
          //     defaultStyle: "unordered",
          //   },
          // },
          checklist: {
            class: Checklist,
            shortcut: "CMD+SHIFT+C",
            inlineToolbar: true,
          },
          image: SimpleImage,
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          code: {
            class: CodeTool,
            shortcut: "CMD+SHIFT+P",
          },
        },
      });
      ref.current = editor;
    }
  };

  return (
    <div className="">
      <div id="editorjs" className=""></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <GenerateAITemplate
          setGenerateAIOutput={(output) => editor?.render(output)}
        />
      </div>
    </div>
  );
};

export default RichDocumentEditor;
