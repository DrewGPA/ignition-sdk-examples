package org.fakester.common.component.display;

import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;
import org.fakester.common.RadComponents;


/**
 * Describes the component to the Java registry so the gateway and designer know to look for the front end elements.
 * In a 'common' scope so that it's referencable by both gateway and designer.
 */
public class ATCalendar  {

    // unique ID of the component which perfectly matches that provided in the javascript's ComponentMeta implementation
    public static String COMPONENT_ID = "rad.display.atcalendar";

    /**
     * The schema provided with the component descriptor. Use a schema instead of a plain JsonObject because it gives
     * us a little more type information, allowing the designer to highlight mismatches where it can detect them.
     */
    public static JsonSchema SCHEMA =
        JsonSchema.parse(RadComponents.class.getResourceAsStream("/atcalendar.props.json"));


    // public static JsonSchema EVENT_SCHEMA =
    //     JsonSchema.parse(RadComponents.class.getResourceAsStream("/atcalendar.events.json"));
    
    // public static ComponentEventDescriptor EVENT_DESCRIPTOR = new ComponentEventDescriptor("onActionPerformed", "Fired when an action occurs", EVENT_SCHEMA);
    
    /**
     * Components register with the Java side ComponentRegistry but providing a ComponentDescriptor.  Here we
     * build the descriptor for this one component. Icons on the component palette are optional.
     */
    public static ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
        .setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
        .setId(COMPONENT_ID)
        .setModuleId(RadComponents.MODULE_ID)
        .setSchema(SCHEMA) //  this could alternatively be created purely in Java if desired
        .setName("ATCalendar")
        .addPaletteEntry("", "ATCalendar", "A custom calendar component.", null, null)
        .setDefaultMetaName("radCalendar")
        .setResources(RadComponents.BROWSER_RESOURCES)
        .build();

}
