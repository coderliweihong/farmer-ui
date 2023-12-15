import * as React from "react";
import { createRoot } from "react-dom";
import { Button, Input } from "@farmerui/ui";
const root = createRoot(document.getElementById('app'));
root.render(<div>
    <Button content="按钮1"/>
    <Input onBlur={(value) => {alert(value)}}/>
</div>);