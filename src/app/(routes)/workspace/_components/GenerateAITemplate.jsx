import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { LuBrain, LuLoader } from "react-icons/lu";
import { TbBrain } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/config/GoogleAIModel";
import { toast } from "sonner";

const GenerateAITemplate = ({ setGenerateAIOutput }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);

  const GenerateFromAI = async () => {
    setLoading(true);
    const PROMPT = "Generate template for editor.js in JSON for" + userInput;
    const result = await chatSession.sendMessage(PROMPT);
    console.log(result.response.text());

    try {
      const output = JSON.parse(result.response.text());
      setGenerateAIOutput(output);
      toast.success("Template Generated !");
    } catch (error) {
      console.error("Error parsing JSON: ", error);
      toast.error("Error Generating Template!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex gap-2 border-2 border-primary"
      >
        <TbBrain size={20} className="text-indigo-800" /> Generate AI Template
      </Button>
      <Dialog open={open}>
        {/* <DialogTrigger></DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Template</DialogTitle>
            <DialogDescription>
              <h2 className="mt-5">What you want to write in document?</h2>
              <Input
                placeholder="Ex. Project Idea"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="mt-5 flex justify-end gap-5">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => GenerateFromAI()}
                  disabled={!userInput || loading}
                >
                  {loading ? (
                    <LuLoader size={20} className="animate-spin" />
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateAITemplate;
