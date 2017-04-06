using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI ListBox for ASP.NET MVC events.
    /// </summary>
    public class ListBoxEventBuilder: EventBuilder
    {
        public ListBoxEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Fires before the list box item is added to the ListBox.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the add event.</param>
        public ListBoxEventBuilder Add(string handler)
        {
            Handler("add", handler);

            return this;
        }

        /// <summary>
        /// Fires before the list box item is added to the ListBox.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder Add(Func<object, object> handler)
        {
            Handler("add", handler);

            return this;
        }

        /// <summary>
        /// Fires when item's position is changed or when the list view selection has changed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public ListBoxEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Fires when item's position is changed or when the list view selection has changed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Fires when the list box has received data from the data source and it is already rendered.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public ListBoxEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Fires when the list box has received data from the data source and it is already rendered.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the end event.</param>
        public ListBoxEventBuilder End(string handler)
        {
            Handler("end", handler);

            return this;
        }

        /// <summary>
        /// Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder End(Func<object, object> handler)
        {
            Handler("end", handler);

            return this;
        }

        /// <summary>
        /// Fires when LisbBox's placeholder changes its position.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the move event.</param>
        public ListBoxEventBuilder Move(string handler)
        {
            Handler("move", handler);

            return this;
        }

        /// <summary>
        /// Fires when LisbBox's placeholder changes its position.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder Move(Func<object, object> handler)
        {
            Handler("move", handler);

            return this;
        }

        /// <summary>
        /// Fires before the list box item is removed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the remove event.</param>
        public ListBoxEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        /// Fires before the list box item is removed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder Remove(Func<object, object> handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        /// Fires when items in the widget are reordered.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the reorder event.</param>
        public ListBoxEventBuilder Reorder(string handler)
        {
            Handler("reorder", handler);

            return this;
        }

        /// <summary>
        /// Fires when items in the widget are reordered.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder Reorder(Func<object, object> handler)
        {
            Handler("reorder", handler);

            return this;
        }

        /// <summary>
        /// Fires when ListBox item(s) drag starts.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the start event.</param>
        public ListBoxEventBuilder Start(string handler)
        {
            Handler("start", handler);

            return this;
        }

        /// <summary>
        /// Fires when ListBox item(s) drag starts.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ListBoxEventBuilder Start(Func<object, object> handler)
        {
            Handler("start", handler);

            return this;
        }

    }
}

