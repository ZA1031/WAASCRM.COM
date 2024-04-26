<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<style>
    
body {
    font-family:system-ui, sans-serif;
    font-size: 70.25%;
}
.header {
    position: relative;
}

.blue-bar {
    background-color: rgb(3,68,107); /* Color de fondo azul */
    height: 20px; /* Altura de la franja */
    width: 100%; /* Ancho completo */
}
.border-bottom {
    border-bottom: 1px solid #dee2e6 !important;
}

.border-5 {
    border-width: 5px !important;
}

.d-flex {
    display: flex !important;
}
.row {
    display: flex;
    flex-wrap: wrap;
    /* margin-right: -15px;
    margin-left: -15px; */
}
.row::after {
    content: "";
    clear: both;
    display: table;
}

.col-2 {
    width: 50%;
    float: left;
    box-sizing: border-box;
    /* padding-right: 15px;
    padding-left: 15px; */
}

.justify-content-between {
    justify-content: space-between !important;
}

.align-items-center {
    align-items: center !important;
}

.mb-0 {
    margin-bottom: 0 !important;
}

.text-muted {
    color: #6c757d !important;
}

.my-5 {
    margin-top: 5rem !important;
    margin-bottom: 5rem !important;
}

.col-md-8 {
    flex: 0 0 66.66667% !important;
    max-width: 66.66667% !important;
}

.col-md-4 {
    flex: 0 0 33.33333% !important;
    max-width: 33.33333% !important;
}

.table {
    width: 100% !important;
    margin-bottom: 1rem !important;
    color: #212529 !important;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05) !important;
}

.table-active {
    background-color: rgba(0, 0, 255, 0.26) !important;
    
}

.text-start {
    text-align: left !important;
}

.col-md-6 {
    flex: 0 0 50% !important;
    max-width: 50% !important;
}

.my-5 {
    margin-top: 5rem !important;
    margin-bottom: 5rem !important;
}

.col-md-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
}
.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    
}

.header {
    width: 100%;
    height: auto;
    
}

</style>
<body>
<div class="blue-bar"></div>
    <div class="container">
        <div class="header border-bottom border-5">
            <div class="row" style="justify-content: space-between;">
                <div class="col-2" style="margin-bottom: 0;">
                    <h4 style="font-size:20px; margin-bottom: 0;"><span style="color: rgb(3,68,107);"><strong>FICHA TÉCNICA </strong></span>/ TECHNICAL DATA</h4>
                </div>
                <div class="col-2" style="position: relative; text-align: right; top:20px;">
                    <img src="https://i2.wp.com/www.citoparagon.es/wp-content/uploads/2019/10/smopyc-2020-logo-350x80.png?ssl=1" style="width: 40%; height: auto;" alt="">
                </div>
            </div>
        </div>
       
        <!-- NOMBRE Y CATEGORÍA -->
        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-2">
                        <h4 style="font-size: 18px; margin-bottom:0; font-weight: lighter;"><span style="color: rgb(3,68,107);">{{ $product->category->name }} </span>/ Category 1{{$product->category->name_en }}</h4>
                        <h3 style="font-size: 20px; margin-top:0;"><span style="color: rgb(3,68,107);">{{ $product->name }}</span> / {{ $product->name_en }}</h3>
                    </div>
                    <div class="col-2" style="display: flex; align-items: center;">
                        <img src="https://i2.wp.com/www.citoparagon.es/wp-content/uploads/2019/10/smopyc-2020-logo-350x80.png?ssl=1" style="width: 80%; height: auto;" alt="">
                    </div>
                </div>
                <div class="col-md-12">
                    <table class="table table-striped table-sm" style="width:100%">
                        <thead>
                            <tr class="table-active">
                                <th>Ref</th>
                                <th>Descripción / Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding-left: 4px;">{{ $product->model }}</td>
                                <td style="padding-left: 4px;">{{ $product->description }}<br><span class="text-muted">(Falta descripción en inglés)</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-2" style="margin-right: 2px; margin-top: 4px; margin-bottom: 10px;">
                            <h4 class="text-start" style="color: rgb(3,68,107);">Datos técnicos:</h4>
                            <ul style="padding-left: 15px;">
                            @foreach ($attrs as $attr)
                                <li>{{ $attr->text }}</li>
                            @endforeach
                            </ul>
                        </div>
                        <div class="col-2">
                            <h4 class="text-start text-muted">Features:</h4>
                            <ul style="padding-left: 15px;">
                            @foreach ($attrs as $attr)
                                <li>{{ $attr->text_en }}</li>
                            @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <h4 style="color: rgb(3,68,107); font-size: 18px; margin-bottom:0; font-weight:bold;"><strong>{{ $product->model }}</strong></h4>
                        <h3 style=" font-size: 18px; margin-top:0;"><span style="color: rgb(3,68,107);">MEMBRANA Y FILTROS </span>/ MEMBRANE AND FILTER</h3>
                        <table class="table table-striped table-sm" style="width:100%">
                            <thead>
                                <tr class="table-active">
                                    <th>Ref</th>
                                    <th>Descripción / Description</th>
                                    <th>Unidades</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($parts as $part)
                                <tr>
                                    <td style="padding-left: 4px;">{{ $part->reference }}</td>
                                    <td style="padding-left: 4px;">{{ $part->description }}<br><span class="text-muted">(Falta descripción en inglés)</span></td>
                                    <td style="padding-left: 4px;">1 unidad</td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="" style="position: relative;">
                    <img src="{{ $mainImage[0] }}" style="width: 100%; height: auto;" alt="">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit consequuntur eaque velit asperiores! Error temporibus quod maxime beatae tenetur praesentium recusandae facere odit hic placeat. Totam perspiciatis, corrupti consectetur esse rerum velit magni iusto quis assumenda suscipit consequatur. Earum perferendis accusantium aspernatur quam delectus animi placeat perspiciatis ipsa cupiditate.
                </div>
            </div>
        </div>
    </div>

</body>
</html>
