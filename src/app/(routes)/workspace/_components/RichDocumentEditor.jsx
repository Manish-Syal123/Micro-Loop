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

const RichDocumentEditor = () => {
  const ref = useRef();
  let editor;

  useEffect(() => {
    InitEditor();
  }, []);

  const SaveDocument = () => {
    ref.current.save().then((outputData) => {
      console.log("Article data: ", outputData);
    });
  };

  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        onChange: (api, event) => {
          SaveDocument();
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
          linkTool: {
            class: LinkTool,
            // config: {
            //   endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
            // }
          },
        },
      });
      ref.current = editor;
    }
  };

  return (
    <div className="flex">
      <div className="relative w-full ml-32 lg:-ml-40">
        <div id="editorjs" className="ltr"></div>
      </div>
    </div>
  );
};

export default RichDocumentEditor;
